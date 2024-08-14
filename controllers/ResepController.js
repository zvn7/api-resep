import imagekit from "../imagekit.js";
import ResepModel from "../models/ResepModel.js";

// Tambah Resep
const TambahResep = async (req, res) => {
	try {
		let imageUrl = "";

		// Handle image upload if present
		if (req.file) {
			const file = req.file;
			const fileName = file.originalname;

			const uploadResponse = await new Promise((resolve, reject) => {
				imagekit.upload(
					{
						file: file.buffer, // Menggunakan file.buffer untuk upload
						fileName: fileName,
					},
					(err, result) => {
						if (err) return reject(err);
						resolve(result.url);
					}
				);
			});

			imageUrl = uploadResponse;
		}

		const newResep = await ResepModel.create({
			...req.body,
			image: imageUrl,
		});

		return res.status(200).json({
			status: "success",
			data: newResep,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

// Update Resep
const UpdateResep = async (req, res) => {
	try {
		let imageUrl = req.body.image;

		// Handle image upload if present
		if (req.file) {
			const file = req.file;
			const fileName = file.originalname;

			const uploadResponse = await new Promise((resolve, reject) => {
				imagekit.upload(
					{
						file: file.buffer, // Menggunakan file.buffer untuk upload
						fileName: fileName,
					},
					(err, result) => {
						if (err) return reject(err);
						resolve(result.url);
					}
				);
			});

			imageUrl = uploadResponse;
		}

		const updatedResep = await ResepModel.findByIdAndUpdate(
			req.params.id,
			{ ...req.body, image: imageUrl },
			{ new: true, runValidators: true }
		);

		return res.status(200).json({
			status: "success",
			data: updatedResep,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

// Fungsi lainnya
const ReadResep = async (req, res) => {
	try {
		const resep = await ResepModel.find();
		return res.status(200).json({
			status: "success",
			data: resep,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

const DetailResep = async (req, res) => {
	try {
		const resep = await ResepModel.findById(req.params.id);
		return res.status(200).json({
			status: "success",
			data: resep,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

const DeleteResep = async (req, res) => {
	try {
		await ResepModel.findByIdAndDelete(req.params.id);
		return res.status(200).json({
			status: "success",
			message: "Data deleted",
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

export { TambahResep, ReadResep, DetailResep, UpdateResep, DeleteResep };
