import express from "express";
const router = express.Router();
import {
  getCategories,
  insertCategories,
} from "../model/category/Category.model.js";

router.all("*", (req, res, next) => {
  next();
});

router.get("/", async (req, res) => {
  try {
    const result = await getCategories(res.body);
    res.json({
      status: "success",
      message: "fetchinhg success",
      result,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await insertCategories(res.body);
    res.json({
      status: "success",
      message: "New category success",
      result,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});
export default router;
