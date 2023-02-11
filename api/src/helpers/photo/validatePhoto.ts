import { PhotoValidateType } from "./types";
import Joi from "joi";

export const photoValidate = (photo: PhotoValidateType) => {
   return Joi.object({
      prompt: Joi.string().required(),
      owner: Joi.string().min(24).max(24).required(),
   }).validate(photo);
};
