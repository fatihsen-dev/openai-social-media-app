import express from "express";
import { login, register } from "../controllers/users";

const router = express.Router();

router.get("/", login);
router.get("/", register);

export default router;
