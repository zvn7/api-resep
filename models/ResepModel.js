import mongoose from "mongoose";

const resepListSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true,
    },
    ingredient: {
        type: String,
        required: true,
    },
    step: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Resep = mongoose.model("Resep", resepListSchema);

export default Resep