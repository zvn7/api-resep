import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// User Model
const userSchema = new mongoose.Schema(
	{
		fullname: {
			type: String,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

export default User;
