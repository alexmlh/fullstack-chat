import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: false,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict", // Helps prevent CSRF attacks
  });
  return token;
};
