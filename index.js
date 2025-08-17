import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./mongoDB/connect.js";
import { loadModules } from "./server/utils/moduleLoader.js";

// -------------------- Setup --------------------
const myEnv = {};
dotenv.config({ processEnv: myEnv });
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const modulesDir = path.join(__dirname, "server/modules");

// -------------------- Middleware --------------------
function setupMiddleware(app) {
  app.use(express.json());
  app.use(express.urlencoded({ limit: "30mb", extended: true }));
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  app.use(morgan("common"));
}
setupMiddleware(app);

// -------------------- Vercel Test Route --------------------
app.get("/", (req, res) => res.json("Hello"));

// -------------------- Server Startup --------------------
const startServer = async () => {
  try {
    // 1️⃣ Connect DB
    await connectDB(myEnv.MONGODB_URL);

    // 2️⃣ Load all modules (models + routes)
    const models = {};
    await loadModules(modulesDir, app, models);

    // 3️⃣ Start server
    const PORT = myEnv.PORT || 3001;
    app.listen(PORT, () =>
      console.log(`🚀 SERVER LISTENING AT http://localhost:${PORT} 🚀`)
    );
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
