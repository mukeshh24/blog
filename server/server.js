import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDb from "./config/db.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server running in PORT : ${PORT}`);
});
