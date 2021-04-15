import express from "express";
const router = express.Router();

import { loginValidation } from "../middleware/formValidation.midleware.js";
import {
  createUser,
  getUserByEmailPassword,
} from "../model/user/User.model.js";

router.all("*", (req, res, next) => {
  next();
});

const User = {
  fName: "Prem",
  lname: "Acharya",
  email: "tesy@gmail.com",
  password: "12345",
};
router.post("/", loginValidation, async (req, res) => {
  try {
    const result = createUser(User);

    // const result = await getUserByEmailPassword(req.body);
    // console.log(result);
    if (result?._id) {
      res.json({
        status: "success",
        message: "login success",
        result,
      });
    }
    res.json({ status: "error", message: "invalid login detail" });
  } catch (error) {
    throw new Error(error);
  }
});
export default router;
