import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { connectDB } from "./config/connectDB.js";
import authRouter from "./routes/auth.routes.js";   

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Server is running on port", PORT);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRouter);



app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`);
    connectDB();
});