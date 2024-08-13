import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
	TambahComment,
	ReadComment,
	DetailComment,
	UpdateComment,
	DeleteComment,
	getCommentsByResepId
} from "../controllers/CommentController.js";

const router = express.Router();

// Protected Comment Routes
router.post("/comment", protect, TambahComment);
router.get("/commentlist", protect, ReadComment);
router.delete("/comment/:id", protect, DeleteComment);
router.get("/commentbyresepId/:resepId", protect, getCommentsByResepId);
// router.get("/comment/:id", protect, DetailComment);
// router.put("/comment/:id", protect, UpdateComment);


export default router;
