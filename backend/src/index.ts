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

// 🚨 Startup Validation Check
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error("FATAL ERROR: SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required.");
  process.exit(1); // Crash early rather than failing silently later
}

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

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'orienter-backend' });
});

app.use('/api/events', eventsRouter);
app.use('/api/registrations', registrationsRouter);

// Start Server
const server = app.listen(port, () => {
  console.log(`🚀 Backend API Gateway running on port ${port}`);
});

// 🛑 Graceful Shutdown for Docker/Jenkins
const shutdown = () => {
  console.log('SIGTERM/SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
