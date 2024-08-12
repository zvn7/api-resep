// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/AuthController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Contoh route yang dilindungi oleh middleware `protect`
router.get('/protected', protect, (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'This is a protected route',
        user: req.user
    });
});

export default router;
