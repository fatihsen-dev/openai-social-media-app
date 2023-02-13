import express from "express";
import { getAllPosts, postCreate, postUpdate, getUserImages } from "../controllers/photo";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/create", postCreate);
router.post("/status", postUpdate);
router.get("/userimages", getUserImages);

export default router;
