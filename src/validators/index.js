import dotenv from "dotenv";
import path from "path";
import { connectDb } from "../db/index.js";
import { server } from "./app.js"; // import the same HTTP+Socket server
import { initPerformanceSDK } from 'ai-perf-sdk';
initPerformanceSDK({
  serviceName: 'my-web-app',
  collectorEndpoint: 'https://prfeai-backend.onrender.com/api/telemetry',
  headers: {
    'x-session-id': '696a6a56f925d92f76e79efd'// Found in browser URL
  }
});
dotenv.config({ path: path.resolve("./.env") });

console.log("DB URI:", process.env.DB ? "Defined" : "Undefined");
connectDb()
  .then(() => {
    server.listen(3000, () => {
      console.log("🚀 Server running on port 3000 with Socket.IO");
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err.message);
  });
