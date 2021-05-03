import express from "express";
const router = express.Router();
import { hashPassword } from "../helper/bcrypt.js";

import { newUserValidation } from "../middleware/formValidation.midleware.js";

import { createUser, getUserById } from "../model/user/User.model.js";
import UsersSchema from "../model/user/User.schema.js";

router.all("*", (req, res, next) => {
  next();
});

router.get("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.send({
        status: "error",
        message: "Invalid request ",
      });
    }
    const user = await getUserById(_id);
    if (user) user.password = undefined;
    user._id
      ? res.send({
          status: "success",
          message: "Welcome to your profile",
          user,
        })
      : res.send({
          status: "error",
          message: "Invalid request",
        });
  } catch (error) {
    // const error = new Error(erroe.message);
    // error.statusCode = 400;
    // throw error;
    res.send({
      status: "error",
      message: "Invalid request",
    });
  }
});
router.post("/", newUserValidation, async (req, res) => {
  try {
    //1.get and destructure password from  frontend
    const { password } = req.body;
    // 2. encrypting password by bycrypt.hash
    const hassPass = await hashPassword(password);
    //3. put encrypt password in req.body and update it
    const newUser = { ...req.body, password: hassPass };
    // 4. save the data in database and wait
    const result = await createUser(newUser);
    //5. check result._id is true(check if there is _id or not
    // iff yes the run success else error)
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
