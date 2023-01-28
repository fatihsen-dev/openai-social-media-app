import { LoginType, RegisterType } from "./types";
import Joi from "joi";

export const registerValidator = (user: RegisterType) => {
   return Joi.object({
      username: Joi.string()
         .min(4)
         .alphanum()
         .regex(/^[^0-9][a-zA-Z0-9_]+$/)
         .max(20)
         .required()
         .messages({
            "string.pattern.base": "Username cannot start with a number",
         }),
      email: Joi.string().required().min(8).max(50).email(),
      password: Joi.string().min(6).max(50).required(),
      avatar: Joi.string().min(5).max(300),
   }).validate(user);
};

export const loginValidator = (user: LoginType) => {
   return Joi.object({
      email: Joi.string().required().min(8).max(50).email(),
      password: Joi.string().min(6).max(50).required(),
   }).validate(user);
};
