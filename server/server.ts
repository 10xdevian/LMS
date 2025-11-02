import { PORT } from "./config";
import { app } from "./app";
import connectDB from "./db";
import { redis } from "./redis";

app.listen(PORT, () => {
  console.log(`✅ Server is runing on : http://localhost:${PORT}`);
  connectDB();
  redis;
});
