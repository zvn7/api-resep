// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		return res.status(401).json({
			status: "fail",
			message: "You are not logged in! Please log in to get access.",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded.id);
		next();
	} catch (error) {
		res.status(401).json({
			status: "fail",
			message: "Token is invalid or expired",
		});
	}
};
