import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Import all route handlers
import authRoutes from '../backend/routes/authRoutes.js';
import userRoutes from '../backend/routes/userRoutes.js';
import attendanceRoutes from '../backend/routes/attendanceRoutes.js';
import leaveRoutes from '../backend/routes/leaveRoutes.js';
import dashboardRoutes from '../backend/routes/dashboardRoutes.js';
import reportRoutes from '../backend/routes/reportRoutes.js';
import notificationRoutes from '../backend/routes/notificationRoutes.js';
import settingsRoutes from '../backend/routes/settingsRoutes.js';
import companySettingsRoutes from '../backend/routes/companySettingsRoutes.js';
import scannerRoutes from '../backend/routes/scannerRoutes.js';
import funRoutes from '../backend/routes/funRoutes.js';

// Import middleware
import { notFound, errorHandler } from '../backend/middleware/errorMiddleware.js';

// Import database connection
import connectDB from '../backend/config/db.js';

// Connect to database
connectDB();

const app = express();

// CORS and JSON middleware
app.use(cors());
app.use(express.json());

// API routes
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/scanner', scannerRoutes);
app.use('/api/fun', funRoutes);
app.use('/api/company-settings', companySettingsRoutes);
app.use('/api/settings', settingsRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
