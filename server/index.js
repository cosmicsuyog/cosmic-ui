import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { connectDB } from "./config/connectDB.js";
import adminRouter from "./routes/admin.route.js";
import authRouter from "./routes/auth.routes.js";
import componentRouter from "./routes/component.route.js";
import paymentRouter from "./routes/payment.route.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: resolve(__dirname, ".env") });
const app = express();

const PORT = process.env.PORT || 3000;
const allowedOrigins = new Set(
  [
    process.env.CLIENT_URL,
    "https://cosmic-ui-z179.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ].filter(Boolean)
);

app.get("/", (req, res) => {
  res.send(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/components", componentRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/admin", adminRouter);
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
  connectDB();
});
