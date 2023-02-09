import { Schema, model } from "mongoose";

export const User = model(
   "User",
   new Schema(
      {
         username: { type: String, required: true },
         email: { type: String, required: true },
         password: { type: String, required: true },
         avatar: { type: String, default: null },
         token: { type: String, default: null },
      },
      {
         timestamps: {
            createdAt: "created",
            updatedAt: "updated",
         },
      }
   )
);
