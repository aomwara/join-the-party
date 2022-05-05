require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import config from "config";
import cookieParser from "cookie-parser";
import connectDB from "./utils/connectDB";
const cors = require("cors");

import userRouter from "./routes/user.route";
import partyRouter from "./routes/party.route";
import joinRouter from "./routes/join.route";

var allowedOrigins = ["http://localhost:3000"];

const app = express();
app.use(
  cors({
    origin: function (origin: any, callback: any) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// Middleware

// 1. Body Parser
app.use(express.json({ limit: "10kb" }));

// 2. Cookie Parser
app.use(cookieParser());

// 3. Logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Routes
app.use("/api/users", userRouter);
app.use("/api/party", partyRouter);
app.use("/api/join", joinRouter);

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = config.get<number>("port");
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  connectDB();
});
