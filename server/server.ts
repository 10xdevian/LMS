import { PORT } from "./config";
import { app } from "./app";
import connectDB from "./utils/db";
import { redis } from "./utils/redis";

app.listen(PORT, () => {
  console.log(`✅ Server is runing on : http://localhost:${PORT}`);
  connectDB();
  redis;
});
