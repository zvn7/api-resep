import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const createToken = (user) => {
	return jwt.sign(
		{ id: user._id, username: user.username, role: user.role },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_EXPIRES_IN }
	);
};

export const registerUser = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		// Hash password sebelum menyimpan user
		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
		});
		const token = createToken(newUser._id);
		res.status(201).json({
			status: "success",
			token,
			data: {
				user: newUser,
			},
		});
	} catch (error) {
		if (error.code === 11000) {
			// Handle duplicate key error (e.g., email or username already exists)
			return res.status(400).json({
				status: "fail",
				message: "Username or email already exists",
			});
		}
		res.status(400).json({
			status: "fail",
			message: error.message,
		});
	}
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				status: "fail",
				message: "Incorrect email or password",
			});
		}

		// Check if password matches
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(401).json({
				status: "fail",
				message: "Incorrect email or password",
			});
		}

		// If correct, send token and user data to client
		const token = createToken(user);
		res.status(200).json({
			status: "success",
			token,
			user: {
				id: user._id,
				username: user.username,
				role: user.role,
			}
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
			message: error.message,
		});
	}
};

