import { services } from "../../modulesLoader.js";

const register = async (req, res) => {
  try {
    const result = await services.UserService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await services.UserService.loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  controllerName: "UserController",
  register,
  login,
};
