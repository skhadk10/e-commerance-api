import express from "express";
const router = express.Router();
import slugify from "slugify";

import { insertProduct } from "../model/product/Product.model.js";

router.all("*", (req, res, next) => {
  next();
});
router.get("/", (req, res) => {
  res.json("not done yet");
});
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const result = await insertProduct(req.body);
    console.log(result);
    if (result?._id) {
      return res.json({
        status: "success",
        message: "the product has been added",
        result,
      });
    }
    res.json({
      status: "error",
      message: "unable to add the product",
      result,
    });
  } catch (error) {
    throw error;
  }
});

export default router;
