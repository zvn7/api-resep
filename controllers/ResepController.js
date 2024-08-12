import ResepModel from "../models/ResepModel.js";

const TambahResep = async (req, res) => {
	try {
		const newResep = await ResepModel.create(req.body);
		return res.status(200).json({
			status: "success",
			data: newResep,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.errors,
		});
	}
};

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
            message: error.errors,
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
            message: error.errors,
        });
    }
};

const UpdateResep = async (req, res) => {
    try {
        const resep = await ResepModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        return res.status(200).json({
            status: "success",
            data: resep,
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.errors,
        });
    }
}

const DeleteResep = async (req, res) => {
    try {
        await ResepModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: "success",
            message: "data deleted",
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.errors,
        });
    }
}

export {
    TambahResep,
    ReadResep,
    DetailResep,
    UpdateResep,
    DeleteResep
}