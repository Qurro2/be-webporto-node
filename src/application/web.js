import express from "express";
import { publicRouter } from "../routes/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { devRouter } from "../routes/dev-api.js";
import cors from "cors";

export const web = express();
web.use(cors());
// Hapus baris ini
web.use(express.urlencoded({ extended: true }));
web.use(express.json());
web.use(publicRouter);
web.use(devRouter);
web.use(errorMiddleware);
