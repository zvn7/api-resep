import Comment from "../models/CommentModel.js";

const TambahComment = async (req, res) => {
	try {
		const newComment = await Comment.create(req.body);
		return res.status(200).json({
			status: "success",
			data: newComment,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

const ReadComment = async (req, res) => {
	try {
		const comments = await Comment.find()
			.populate("recipesId")
			.populate("userId");
		return res.status(200).json({
			status: "success",
			data: comments,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

const DetailComment = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id)
			.populate("recipesId")
			.populate("userId");
		return res.status(200).json({
			status: "success",
			data: comment,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

const UpdateComment = async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		return res.status(200).json({
			status: "success",
			data: comment,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

const DeleteComment = async (req, res) => {
	try {
		await Comment.findByIdAndDelete(req.params.id);
		return res.status(200).json({
			status: "success",
			message: "Comment deleted",
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error.message,
		});
	}
};

const getCommentsByResepId = async (req, res) => {
    const { resepId } = req.params;

    try {
        const comments = await Comment.find({ recipesId: resepId })
            .populate("userId")
            .populate("recipesId");

        if (!comments || comments.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "No comments found for this recipe",
            });
        }

        res.status(200).json({
            status: "success",
            data: comments,
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
        });
    }
};

export {
    TambahComment,
    ReadComment,
    DetailComment,
    UpdateComment,
    DeleteComment,
    getCommentsByResepId 
};

