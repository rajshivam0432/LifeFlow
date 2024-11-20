import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "../backend/routes/auth.js"
import cors from "cors";
import hospitalRoutes from "./routes/requests.js";

dotenv.config();

const app = express();

// Cookie parser middleware
app.use(cookieParser());

// Use method-override middleware
// app.use(methodOverride("_method"));

// CORS Configuration
const allowedOrigins =
  process.env.FRONTEND_DOMAIN_PROD || process.env.FRONTEND_DOMAIN_DEV;
console.log(allowedOrigins);
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};


// Apply CORS middleware
// app.use(cors(corsOpt/ions));

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Root route
app.get("/", (req, res) => {
  res.send("Server is ready to use!!!");
});

// API routes
app.use("/api/auth", router);//http:localhost:3000/api/auth
app.use("/api/request", hospitalRoutes);//http:localhost:3000/api/join


// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error("Error: ", message); // Log the error for debugging
  res.status(statusCode).json({ success: false, statusCode, message });
});

export default app;
