import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import mongoose from "mongoose";

import { setModel } from "./utils/modelsContainer.js";

export async function loadModels(modulesDir, app) {
  const folders = fs.readdirSync(modulesDir);

  for (const folder of folders) {
    const folderPath = path.join(modulesDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    // ----- Load all models automatically -----
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      if (!file.endsWith("-model.js")) continue;

      try {
        const fileUrl = pathToFileURL(path.join(folderPath, file)).href;
        const { default: model } = await import(fileUrl);

        if (!model?.modelName || !(model.prototype instanceof mongoose.Model)) {
          throw new Error(`Invalid model export in ${file}`);
        }

        setModel(model.modelName, model);

        console.log(`✅ Loaded model: ${model.modelName}`);
      } catch (err) {
        console.error(`❌ Failed to load model ${file}:`, err.message);
        process.exit(1);
      }
    }

    // ----- Load routes if index.js exists -----
    const indexFile = path.join(folderPath, "index.js");
    if (fs.existsSync(indexFile)) {
      try {
        const moduleUrl = pathToFileURL(indexFile).href;
        const { default: mod } = await import(moduleUrl);

        if (typeof mod === "function") {
          // Call the module function with the app instance
          mod(app);
          console.log(`🛣 Loaded routes from module: ${folder}`);
        }
      } catch (err) {
        console.error(
          `❌ Failed to load routes from module ${folder}:`,
          err.message
        );
        process.exit(1);
      }
    }
  }

  console.log("📦 All modules loaded successfully");
}
