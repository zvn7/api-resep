import Favorite from "../models/FavoriteModel.js"; 

export const addFavorite = async (req, res) => {
    const { userId, recipesId } = req.body;

    try {
        const favorite = new Favorite({ userId, recipesId });
        await favorite.save();
        res.status(201).json({ message: 'Resep berhasil ditambahkan ke favorit', favorite });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menambahkan resep ke favorit', error });
    }
};

export const removeFavorite = async (req, res) => {
    const { userId, recipesId } = req.body;

    try {
        await Favorite.findOneAndDelete({ userId, recipesId });
        res.status(200).json({ message: 'Resep berhasil dihapus dari favorit' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus resep dari favorit', error });
    }
};

export const getUserFavorites = async (req, res) => {
    const { userId } = req.params;

    try {
        const favorites = await Favorite.find({ userId }).populate('recipesId');
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil daftar resep favorit', error });
    }
};
