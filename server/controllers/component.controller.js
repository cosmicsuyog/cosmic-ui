import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import Component from "../models/component.model.js";
import User from "../models/user.model.js";

const getCommandErrorOutput = (error) => {
  const stderr = error.stderr?.toString?.() || "";
  const stdout = error.stdout?.toString?.() || "";
  return [stderr, stdout, error.message].filter(Boolean).join("\n").trim();
};

const isOtpRequiredError = (output) => output.includes("EOTP") || output.includes("one-time password");

const quoteArg = (arg) => `"${String(arg).replace(/"/g, '\\"')}"`;

const runNpmCommand = (args, cwd) =>
  execSync(`npm ${args.map(quoteArg).join(" ")}`, {
    cwd,
    encoding: "utf-8",
    stdio: "pipe",
  });

export const saveComponent = async (req, res) => {
  try {
    const { name, code, props, visibility } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    if (user.role === "admin") {
      const existing = await Component.findOne({
        name,
        visibility: "public",
      });

      if (existing) {
        return res
          .status(400)
          .json({ message: "Admin cannot create duplicate public component  name" });
      }
    }

    if (user.role !== "admin") {
      const existing = await Component.findOne({
        name,
        owner: req.userId,
      });

      if (existing) {
        return res.status(400).json({ message: "You already have a component with this name" });
      }
    }

    const component = await Component.create({
      name,
      code,
      props,
      visibility,
      owner: req.userId,
    });

    return res.status(200).json({
      message: "Component created successfully",
      component,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to Save Component", error });
  }
};

export const publishComponent = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can publish" });
    }

    const { componentId, otp } = req.body;

    if (otp && !/^\d{6,8}$/.test(otp)) {
      return res.status(400).json({ message: "Enter a valid npm one-time password" });
    }

    const component = await Component.findById(componentId);

    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }

    if (component.owner.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "You can only publish your own components" });
    }

    const libPath = path.join(process.cwd(), "../library");
    const packageJsonPath = path.join(libPath, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    const componentDir = path.join(libPath, "src/components", component.name);

    const componentFile = path.join(componentDir, `${component.name}.jsx`);

    const indexFile = path.join(libPath, "src/index.js");

    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    fs.writeFileSync(componentFile, component.code);

    const indexContent = fs.readFileSync(indexFile, "utf-8");

    const exportLine = `export { ${component.name} } from "./components/${component.name}/${component.name}.jsx";`;

    if (!indexContent.includes(exportLine)) {
      fs.appendFileSync(indexFile, `\n${exportLine}\n`);
    }

    //    clean Old Build
    const distPath = path.join(libPath, "dist");
    if (fs.existsSync(distPath)) {
      fs.rmSync(distPath, { recursive: true, force: true });
    }

    //    run build
    console.info("Building library...");
    runNpmCommand(["run", "build"], libPath);
    if (!otp) {
      console.info("Updating version...");
      runNpmCommand(["version", "patch", "--no-git-tag-version"], libPath);
    }

    console.info("Publishing to npm ...");
    const tempNpmConfigDir = process.env.NPM_TOKEN
      ? fs.mkdtempSync(path.join(os.tmpdir(), "cosmic-ui-npm-"))
      : null;
    const tempNpmConfigPath = tempNpmConfigDir ? path.join(tempNpmConfigDir, ".npmrc") : null;

    try {
      if (tempNpmConfigPath) {
        fs.writeFileSync(
          tempNpmConfigPath,
          `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}\n`
        );
      }

      runNpmCommand(
        [
          "publish",
          "--access",
          "public",
          ...(tempNpmConfigPath ? ["--userconfig", tempNpmConfigPath] : []),
          ...(otp ? [`--otp=${otp}`] : []),
        ],
        libPath
      );
    } finally {
      if (tempNpmConfigDir) {
        fs.rmSync(tempNpmConfigDir, { recursive: true, force: true });
      }
    }

    component.visibility = "public";
    component.npmPackage = packageJson.name;

    await component.save();

    return res.status(200).json({ message: "Component published successfully" });
  } catch (error) {
    const commandOutput = getCommandErrorOutput(error);
    console.error("Failed to publish component:", commandOutput || error);
    if (isOtpRequiredError(commandOutput)) {
      return res.status(409).json({
        code: "NPM_OTP_REQUIRED",
        message: "NPM requires a one-time password to publish this package.",
        error: "Enter the current 2FA code from your authenticator app and try publishing again.",
      });
    }

    return res.status(500).json({
      message: "Failed to publish component",
      error: commandOutput || error.message,
    });
  }
};


export const getAllComponents = async (req, res) => {
  try{
    const components = await Component.find({}).populate("owner", "name,email").sort({createdAt: -1})
    if(!components){
        return res.status(404).json({
            message:"Failed to get all components",
            success:false
        })
    }
    return res.status(200).json({
        message:"success",
        success:true,
        components
    })
  }catch(error){
      return res.status(500).json({ message: "Failed to get all components", error });
  }
}