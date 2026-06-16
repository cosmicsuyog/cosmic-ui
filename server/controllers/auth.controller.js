import { generateToken } from "../config/token.js";
import userModel from "../models/user.model.js";

const getAuthCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    console.info("[auth/google] request body:", {
      name: name || null,
      email: email || null,
    });

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required for Google auth",
      });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        name,
        email,
      });
    }

    const token = generateToken(user._id);
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate auth token",
      });
    }

    res.cookie("token", token, getAuthCookieOptions());

    return res.status(200).json({ success: true, token, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: `Google Auth Error : ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", getAuthCookieOptions());
    return res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: `Logout Error : ${error}` });
  }
};
