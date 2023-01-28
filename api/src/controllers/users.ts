import Joi from "joi";
import { createToken, verifyToken } from "./../helpers/token/authToken";
import { User } from "./../models/User";
import { loginValidator, registerValidator } from "./../helpers/auth/authValidator";
import { Request, Response } from "express";
import { hash, compare } from "bcrypt";

export const register = async (req: Request, res: Response) => {
   const { error } = registerValidator(req.body);

   if (error) {
      return res.status(400).send({ message: error.details[0].message });
   }

   try {
      const userControl = await User.findOne({
         $or: [{ email: req.body.email }, { username: req.body.username }],
      });

      if (userControl) {
         console.log(userControl);
         return res.status(302).send({ message: "Username or Email already exist" });
      }

      const user = await User.create({
         ...req.body,
         password: await hash(req.body.password, 10),
      });

      await User.findByIdAndUpdate(user._id, {
         token: createToken({ _id: `${user._id}`, email: user.email }),
      });

      return res.send(await User.findById(user._id).select("-password -__v -updated"));
   } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Server error (Register)" });
   }
};

export const login = async (req: Request, res: Response) => {
   const { error } = loginValidator(req.body);

   if (error) {
      return res.status(400).send({ message: error.details[0].message });
   }

   try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
         if (await compare(req.body.password, user.password)) {
            await User.findByIdAndUpdate(user._id, {
               token: createToken({ _id: `${user._id}`, email: user.email }),
            });
            return res.send(
               await User.findById(user._id).select("-password -__v -updated")
            );
         }
         return res.status(403).send({ message: "Invalid password" });
      }
      return res.status(404).send({ message: "User not exist" });
   } catch (error) {}
};

export const control = async (req: Request, res: Response) => {
   const { error } = Joi.object({
      _id: Joi.string().required().min(24).max(24),
      token: Joi.string().required().min(10),
   }).validate(req.body);

   if (error) {
      return res.send({ message: error.details[0].message });
   }

   try {
      const user = await User.findById(req.body._id).select("-password -__v -updated");

      if (user) {
         if (user.token === req.body.token) {
            return res.send(user);
         } else {
            return res.status(422).send({ message: "Incompatible token" });
         }
      } else {
         return res.status(422).send({ message: "Invalid id" });
      }
   } catch (error) {
      return res.status(422).send({ message: "Invalid token" });
   }
};
