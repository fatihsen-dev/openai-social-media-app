import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
const app = express();
import mongoose from "mongoose";
import userRouter from "./src/routes/users";
import photoRouter from "./src/routes/photo";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(express.static("src/public"));
app.use(bodyParser.json());
dotenv.config();
app.use(cors());

app.listen(process.env.PORT || 5000, () => {
   console.log(`Server listen ${process.env.PORT || 5000}`);
});

app.use("/user", userRouter);
app.use("/photo", photoRouter);

(async () => {
   try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(`${process.env.DB_URL}`);
      return console.log("connected db");
   } catch (err) {
      return console.log(err);
   }
})();
