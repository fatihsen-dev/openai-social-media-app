import { Schema, model } from "mongoose";

export const User = model(
   "User",
   new Schema(
      {
         username: { type: String, required: true },
         email: { type: String, required: true },
         password: { type: String, required: true },
         avatar: { type: String, default: null },
         photos: [{ type: Schema.Types.ObjectId, ref: "Photo" }],
         token: { type: String, default: null },
      },
      {
         timestamps: {
            createdAt: "joined",
            updatedAt: "updated",
         },
      }
   )
);
