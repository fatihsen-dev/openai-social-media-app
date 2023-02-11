import { ImageType } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ImageType = {
   images: [
      {
         _id: "",
         prompt: "",
         image: "",
         owner: {
            email: "",
            username: "",
            _id: "",
         },
         created: "",
      },
   ],
};

export const imageSlice = createSlice({
   name: "imageSlice",
   initialState,
   reducers: {
      loadImages: (state, action: PayloadAction<ImageType>) => {
         state.images = action.payload.images;
      },
   },
});

export const { loadImages } = imageSlice.actions;
export default imageSlice.reducer;
