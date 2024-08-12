import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
	TambahUser,
	ReadUser,
	DetailUser,
	UpdateUser,
	DeleteUser,
} from "../controllers/UserController.js";

const router = express.Router();

// Protected User Routes
router.post("/user", protect, TambahUser);
router.get("/userlist", protect, ReadUser);
router.get("/user/:id", protect, DetailUser);
router.put("/user/:id", protect, UpdateUser);
router.delete("/user/:id", protect, DeleteUser);

export default router;
