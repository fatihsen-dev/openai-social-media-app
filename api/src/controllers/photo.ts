import Joi from "joi";
import { base64ToImage } from "./../helpers/file/saveFile";
import { photoValidate } from "./../helpers/photo/validatePhoto";
import { Response, Request } from "express";
import { Photo } from "../models/Photo";
import { openai } from "../..";

export const getAllPosts = async (req: Request, res: Response) => {
   return res.send(
      await Photo.find({ shared: true })
         .sort({ created: -1 })
         .select("-__v -updated -shared")
         .populate({
            path: "owner",
            select: "-password -__v -token -updated -created -avatar",
         })
   );
};

export const postCreate = async (req: Request, res: Response) => {
   const { error } = photoValidate(req.body);

   if (error) {
      return res.status(400).send({ message: error.details[0].message });
   }

   try {
      const { prompt } = req.body;

      const response = await openai.createImage({
         prompt,
         n: 1,
         size: "1024x1024",
         response_format: "b64_json",
      });

      const image = response.data.data[0].b64_json;

      if (image) {
         let fileName = `images/image-${Date.now()}-${Math.floor(
            Math.random() * 9999
         )}.jpg`;

         base64ToImage(`./src/public/${fileName}`, image);

         const { owner } = req.body;
         const photo = await Photo.create({
            prompt,
            image: fileName,
            owner,
         });

         return res.status(200).send(photo);
      }
      return res.status(500).send({
         message: "An error occurred while creating the image.",
      });
   } catch (error: any) {
      console.error(error);
      return res.status(500).send({
         message: "Something went wrong",
      });
   }
};

export const postUpdate = async (req: Request, res: Response) => {
   const { error } = Joi.object({
      _id: Joi.string().min(24).max(24).required(),
   }).validate(req.body);

   if (error) {
      return res.status(400).send({ message: error.details[0].message });
   }

   try {
      console.log(req.body._id);
      await Photo.findByIdAndUpdate(req.body._id, {
         shared: true,
      });

      return res.send({ message: "success" });
   } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Server error" });
   }
};

export const getUserImages = async (req: Request, res: Response) => {
   const { error } = Joi.object({
      _id: Joi.string().min(24).max(24).required(),
   })
      .options({ allowUnknown: true })
      .validate(req.headers);

   if (error) {
      return res.status(404).send({ message: error.details[0].message });
   }

   return res.send(
      await Photo.find({ owner: req.headers._id, shared: true })
         .sort({ created: -1 })
         .select("-__v -updated -shared")
         .populate({
            path: "owner",
            select: "-password -__v -token -updated -created -avatar",
         })
   );
};
