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
