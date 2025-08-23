import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(403).json({ message: "No token" });
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = { id: payload.sub, role: payload.role };
    return next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// export const requireRole = (role) => (req, res, next) => {
//   if (req.user?.role !== role) return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
//   next();
// };
