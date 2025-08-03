import express from 'express';
import User from '../models/userModel.js';
import { loginUser, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/me', protect, getMe);

// Temporary route to check users (remove after debugging)
router.get('/debug/users', async (req, res) => {
    try {
        const users = await User.find({}, 'name email role');
        res.json({
            count: users.length,
            users: users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
