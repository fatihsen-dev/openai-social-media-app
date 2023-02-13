import axios from "axios";
const HTTP = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
});

export const loginRequest = async (data: { email: string; password: string }) =>
   await HTTP.post("/user/login", data);

export const controlRequest = async (data: { token: string; _id: string }) =>
   await HTTP.post("/user/control", data);

export const registerRequest = async (data: {
   username: string;
   email: string;
   password: string;
}) => await HTTP.post("/user/register", data);

export const getImages = async () => await HTTP.get("/photo");

export const createImage = async (data: { prompt: string; owner: string }) =>
   await HTTP.post("/photo/create", data);

export const updateImageState = async (data: { _id: string }) =>
   await HTTP.post("/photo/status", data);

export const getUserImages = async (_id: string) =>
   await HTTP.get("/photo/userimages", {
      headers: {
         _id,
      },
   });
