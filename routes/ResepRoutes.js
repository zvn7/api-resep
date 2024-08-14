import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { TambahResep, ReadResep, DetailResep, UpdateResep, DeleteResep } from '../controllers/ResepController.js';
import upload from '../middlewares/multerConfig.js';

const router = express.Router();

// Protected Recipe Routes
router.post('/resep', protect, upload.single('image'), TambahResep);
router.get('/reseplist', protect, ReadResep);
router.get('/resep/:id', protect, DetailResep);
router.put('/resep/:id', protect, upload.single('image'), UpdateResep);
router.delete('/resep/:id', protect, DeleteResep);

export default router;
