import express from "express";
const router = express.Router();
import { hashPassword, comparePassword } from "../helper/bcrypt.js";
import { createAccessJWT, createRefreshJWT } from "../helper/jwt.helper.js";

import {
  loginValidation,
  newUserValidation,
} from "../middleware/formValidation.midleware.js";

import { createUser, getUserByEmail } from "../model/user/User.model.js";

router.all("*", (req, res, next) => {
  next();
});

router.post("/", newUserValidation, async (req, res) => {
  try {
    const { password } = req.body;

    const hassPass = await hashPassword(password);

    const newUser = { ...req.body, password: hassPass };

    const result = await createUser(newUser);

    if (result?._id) {
      return res.json({
        status: "success",
        message: "login success",
        result,
      });
    }
    res.json({ status: "error", message: "invalid login detail" });
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
      return res.json({ status: "error", message: "This email already exist" });
    }
    throw new Error(error.message);
  }
});
export default router;
