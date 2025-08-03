import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    // Log for debugging purposes (remove in production)
    console.log('Login attempt for email:', email);
    
    // Check how many users exist in the database
    const userCount = await User.countDocuments();
    console.log('Total users in database:', userCount);
    
    const user = await User.findOne({ email });
    
    console.log('User found:', user ? 'Yes' : 'No');

    if (user && (await user.matchPassword(password))) {
        console.log('Password match: Yes');
        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                department: user.department,
                phone: user.phone,
                reportTo: user.reportTo,
                joinedOn: user.joinedOn,
                employeeId: user.employeeId,
                status: user.status,
            },
            token: generateToken(user._id),
        });
    } else {
        console.log('Login failed for email:', email);
        console.log('User exists:', !!user);
        if (user) {
            console.log('Password match:', await user.matchPassword(password));
        }
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    // req.user is set by the protect middleware
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        avatar: req.user.avatar,
        department: req.user.department,
        phone: req.user.phone,
        reportTo: req.user.reportTo,
        joinedOn: req.user.joinedOn,
        employeeId: req.user.employeeId,
        status: req.user.status,
    };
    res.status(200).json({
        success: true,
        data: user
    });
});

export { loginUser, getMe };