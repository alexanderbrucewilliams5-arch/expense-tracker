import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import transactionsRouter from "./routes/transactions.js";
import errorHandler from "./middlewares/errorHandler.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect database
connectDB();

// Middlewares
// CORS Setup
const options = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}

app.use(cors(options));

// Security headers
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/transaction", transactionsRouter);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running successfully on http://localhost:${PORT}`));