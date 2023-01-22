import JWT from "jsonwebtoken";

export const createToken = (data: { _id: string; email: string }) => {
   return JWT.sign(data, `${process.env.JWT_KEY}`);
};

export const verifyToken = (token: string) => {
   return JWT.verify(token, `${process.env.JWT_KEY}`);
};
