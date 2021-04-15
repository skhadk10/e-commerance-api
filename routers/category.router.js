import express from "express";
const router = express.Router();
import slugify from "slugify";

import {
  getCategories,
  insertCategories,
  deleteCategories,
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
  const { name, parentCat } = req.body;
  console.log(res.body);

  try {
    const newCat = {
      name,
      slug: slugify(name, { lower: true }),
      parentCat,
    };
    const result = await insertCategories(newCat);
    console.log(result);
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

router.delete("/", async (req, res) => {
  const { name, parentCat } = req.body;
  const catIds = req.body;
  try {
    const result = await deleteCategories(catIds);
    console.log(result);
    if (result.deletedCount) {
      return res.json({
        status: "success",
        message: "Category and it's child category has been deleted",
        result,
      });
    }
    return res.json({
      status: "error",
      message: "Unable to delete the category",
      result,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});
export default router;
