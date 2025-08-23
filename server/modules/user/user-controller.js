import jwt from "jsonwebtoken";
import { getModel } from "../../../mongoDB/models/utils/modelsContainer.js";

export const register = async (req, res) => {
  try {
    const userModel = getModel("User");
    const { firstName, lastName, email, password } = req.body;

    // check if user already exists
    const userAlreadyExists = await userModel.findOne({
      email: email?.trim()?.toLowerCase(),
    });

    if (userAlreadyExists)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    // create new user (password will be hashed automatically via pre-save hook)
    const newUser = await userModel.create({
      firstName,
      lastName,
      email: email?.trim()?.toLowerCase(),
      password,
    });

    // generate JWT token
    const token = jwt.sign(
      { id: newUser._id }, // payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: process.env.JWT_EXPIRATION || "1h" } // token expiry
    );

    const response = {
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const userModel = getModel("User");
    const { email, password } = req.body;

    // find user
    const user = await userModel.findOne({
      email: email?.trim()?.toLowerCase(),
    });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    // compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || "1h",
    });

    const userInfo = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    res.status(200).json({ token, user: userInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
