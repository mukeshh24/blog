import dotenv from "dotenv";
dotenv.config();

import app from "../app.js";
import connectDb from "../config/db.js";

await connectDb();

export default app;