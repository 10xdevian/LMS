import Redis from "ioredis";
import { REDIS_URL } from "../config";

if (!REDIS_URL) {
  throw new Error("Redis URL not defined in config!");
}

export const redis = new Redis(REDIS_URL);

// Event listeners
redis.on("connect", () => console.log("✅ Redis is connected"));
redis.on("ready", () => console.log("⚡ Redis is ready to use"));
redis.on("error", (err) => console.error("[ioredis] Error:", err));
redis.on("close", () => console.log("[ioredis] Connection closed"));
