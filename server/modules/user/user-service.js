import jwt from "jsonwebtoken";

import { models } from "../../modulesLoader.js";

const registerUser = async ({ firstName, lastName, email, password }) => {
  const userModel = models.User;

  // check if user already exists
  const userAlreadyExists = await userModel.findOne({
    email: email?.trim()?.toLowerCase(),
  });
  if (userAlreadyExists) {
    throw new Error("An account with this email already exists.");
  }

  // create new user
  const newUser = await userModel.create({
    firstName,
    lastName,
    email: email?.trim()?.toLowerCase(),
    password,
  });

  // generate JWT
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || "1h",
  });

  return {
    message: "User registered successfully",
    token,
    user: {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    },
  };
};

const loginUser = async ({ email, password }) => {
  const userModel = models.User;

  const user = await userModel.findOne({
    email: email?.trim()?.toLowerCase(),
  });
  if (!user) throw new Error("User does not exist");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid password");

  // generate JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || "1h",
  });

  return {
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  };
};

export default {
  serviceName: "UserService",
  registerUser,
  loginUser,
};
