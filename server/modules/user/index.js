import express from "express";

import { validate } from "../../../middleware/validate.js";
import { loginSchema, registerSchema } from "./user-validation.js";
import { controllers } from "../../modulesLoader.js";

const router = express.Router();

// Routes with Joi validation middleware
router.post(
  "/register",
  validate(registerSchema),
  controllers.UserController.register
);
router.post("/login", validate(loginSchema), controllers.UserController.login);

export default {
  indexRoute: "/user",
  router,
};
