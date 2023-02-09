import { Schema, model } from "mongoose";

export const Photo = model(
   "Photo",
   new Schema(
      {
         prompt: { type: String, required: true },
         image: { type: String, required: true },
         shared: { type: Boolean, default: false },
         owner: { type: Schema.Types.ObjectId, ref: "User" },
      },
      {
         timestamps: {
            createdAt: "created",
            updatedAt: "updated",
         },
      }
   )
);
