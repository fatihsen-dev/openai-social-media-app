import { createToken } from "./../helpers/token/authToken";
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
