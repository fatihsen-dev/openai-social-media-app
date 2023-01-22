import { UserType } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: UserType = {
   status: null,
   user: {
      _id: "",
      username: "",
      email: "",
      avatar: null,
      photos: [],
      token: "",
      joined: "",
   },
};

export const authSlice = createSlice({
   name: "authSlice",
   initialState,
   reducers: {
      Login: (state, action: PayloadAction<UserType>) => {
         state.status = action.payload.status;
         state.user = action.payload.user;
      },
   },
});

export const { Login } = authSlice.actions;
export default authSlice.reducer;
