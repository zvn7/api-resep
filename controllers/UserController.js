import User from "../models/UserModel.js";

const TambahUser = async (req, res) => {
	try {
		const newUser = await User.create(req.body);
		return res.status(200).json({
			status: "success",
			data: newUser,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

const ReadUser = async (req, res) => {
	try {
		const users = await User.find();
		return res.status(200).json({
			status: "success",
			data: users,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

const DetailUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		return res.status(200).json({
			status: "success",
			data: user,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

const UpdateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		return res.status(200).json({
			status: "success",
			data: user,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

const DeleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		return res.status(200).json({
			status: "success",
			message: "User deleted",
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

export { TambahUser, ReadUser, DetailUser, UpdateUser, DeleteUser };
