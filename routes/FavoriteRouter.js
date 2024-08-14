import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
	addFavorite,
	removeFavorite,
    getUserFavorites
} from "../controllers/FavoriteController.js";

const router = express.Router();

router.post("/addFavorite", protect, addFavorite);
router.get("/userFavorites/:userId", protect, getUserFavorites);
router.delete("/removeFavorite", protect, removeFavorite);

export default router;
