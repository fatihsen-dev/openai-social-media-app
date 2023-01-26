import express from "express";
import { login, register, control } from "../controllers/users";

const router = express.Router();

router.post("/login", login);
router.post("/control", control);
router.post("/register", register);

export default router;
