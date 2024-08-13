import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    recipesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resep',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;