import express, { NextFunction, Request, Response } from "express";
import { getAllPosts, postCreate, postUpdate } from "../controllers/photo";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/create", postCreate);
router.post("/status", postUpdate);

export default router;
