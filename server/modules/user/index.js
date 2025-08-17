import express from "express";

// import { registerUser, loginUser } from "./user-controller.js";
import { validate } from "../../../middleware/validate.js";
import { loginSchema, registerSchema } from "./user-validation.js";

export default (app) => {
  const router = express.Router();

  // Routes with Joi validation middleware
//   router.post("/register", validate(registerSchema), registerUser);
//   router.post("/login", validate(loginSchema), loginUser);

  app.use("/users", router);
};
