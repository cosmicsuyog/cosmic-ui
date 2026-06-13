import express from "express";

import { getAllComponents } from "../controllers/component.controller.js";
import { getAllUsers, getCurrentUser } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import Component from "../models/component.model.js";
import User from "../models/user.model.js";

const adminRouter = express.Router();

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.adminUser = user;
    return next();
  } catch (error) {
    return res.status(500).json({ message: `Admin check failed: ${error.message}` });
  }
};

adminRouter.use(isAuth, isAdmin);

adminRouter.get("/me", getCurrentUser);
adminRouter.get("/users", getAllUsers);
adminRouter.get("/components", getAllComponents);

adminRouter.get("/stats", async (_req, res) => {
  try {
    const [totalUsers, totalComponents, publicComponents, privateComponents] = await Promise.all([
      User.countDocuments(),
      Component.countDocuments(),
      Component.countDocuments({ visibility: "public" }),
      Component.countDocuments({ visibility: "private" }),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalComponents,
        publicComponents,
        privateComponents,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: `Failed to get admin stats: ${error.message}` });
  }
});

export default adminRouter;
