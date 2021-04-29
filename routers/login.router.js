import express from "express";
const router = express.Router();
import { hashPassword, comparePassword } from "../helper/bcrypt.js";
import { createAccessJWT, createRefreshJWT } from "../helper/jwt.helper.js";

import { loginValidation } from "../middleware/formValidation.midleware.js";

import { getUserByEmail } from "../model/user/User.model.js";

router.all("*", (req, res, next) => {
  next();
});

router.post("/", loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user?._id) {
      return res.status(403).json({
        status: "error",
        message: "fail no email is there",
      });
    }

    const dbMashPass = user.password;
    const result = await comparePassword(password, dbMashPass);
    user.password = undefined;
    user.refreshJWT = undefined;
    if (!result) {
      return res.json({
        status: "error",
        message: "Invalid 11login details",
      });
    }

    // create accessJWT
    const accessJWT = await createAccessJWT(user.email, user._id);
    const refreshJWT = await createRefreshJWT(user.email, user._id);

    res.json({
      status: "success",
      message: "login success",
      user,
      accessJWT,
      refreshJWT,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});
export default router;
