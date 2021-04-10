import express from "express";
import { loginValidation } from "../middleware/formValidation.midleware.js";
const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});
router.post("/", loginValidation, (req, res) => {
  console.log(req.body);
  res.json({
    message: "login requested",
  });
});
export default router;
