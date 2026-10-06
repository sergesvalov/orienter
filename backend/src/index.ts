import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import eventsRouter from './routes/events';
import registrationsRouter from './routes/registrations';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 🛡️ Security and Logging Middlewares
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

// 🚦 Global Rate Limiting (100 req per 15 min)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', apiLimiter);

// --- ROUTES ---

// 1. Health Check (for Jenkins CI/CD pipeline tests)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'orienter-backend' });
});

// 2. Delegate to Routers
app.use('/api/events', eventsRouter);
app.use('/api/registrations', registrationsRouter);

// Start Server
app.listen(port, () => {
  console.log(`🚀 Backend API Gateway running on port ${port}`);
});
