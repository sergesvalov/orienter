"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const supabase_js_1 = require("@supabase/supabase-js");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// 🛡️ Security and Logging Middlewares
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 🚦 Global Rate Limiting (100 req per 15 min)
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', apiLimiter);
// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
// --- ROUTES ---
// 1. Health Check (for Jenkins CI/CD pipeline tests)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'orienter-backend' });
});
// 2. Get Events for Android & Web clients
app.get('/api/events', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('start_date', { ascending: true });
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// 3. Register for an event
app.post('/api/registrations', async (req, res) => {
    const { eventId, userId, category } = req.body;
    try {
        // Basic API Gateway logic before hitting DB
        if (!eventId || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const { data, error } = await supabase
            .from('registrations') // Assuming this table exists or will exist
            .insert([{ event_id: eventId, user_id: userId, status: 'pending' }])
            .select()
            .single();
        if (error)
            throw error;
        res.status(201).json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Start Server
app.listen(port, () => {
    console.log(`🚀 Backend API Gateway running on port ${port}`);
});
