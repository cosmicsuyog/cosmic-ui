import express from "express";

import { generateComponent } from "../controllers/aicomponent.controller.js";
import { getMyComponents, publishComponent, saveComponent } from "../controllers/component.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const componentRouter = express.Router();

componentRouter.post("/generate", isAuth, generateComponent);
componentRouter.get("/my", isAuth, getMyComponents);
componentRouter.post("/save", isAuth, saveComponent);
componentRouter.post("/publish", isAuth, publishComponent);

export default componentRouter;
