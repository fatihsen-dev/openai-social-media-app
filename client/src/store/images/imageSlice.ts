import { ImageType, OneImgType } from "./types";
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
   userImages: [
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
      loadImages: (state, action: PayloadAction<{ images: [OneImgType] }>) => {
         state.images = action.payload.images;
      },
      loadUserImages: (state, action: PayloadAction<{ images: [OneImgType] }>) => {
         state.userImages = action.payload.images;
      },
   },
});

export const { loadImages, loadUserImages } = imageSlice.actions;
export default imageSlice.reducer;
