import express from "express";

import { login, register } from "./user-controller.js";
import { validate } from "../../../middleware/validate.js";
import { loginSchema, registerSchema } from "./user-validation.js";

export default (app) => {
  const router = express.Router();

  // Routes with Joi validation middleware
  router.post("/register", validate(registerSchema), register);
  router.post("/login", validate(loginSchema), login);

  app.use("/user", router);
};
