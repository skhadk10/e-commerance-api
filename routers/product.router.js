import express from "express";
const router = express.Router();
import slugify from "slugify";
import {
  newProductValidation,
  updateProductValidation,
} from "../middleware/formValidation.midleware.js";

import {
  getProducts,
  deleteProduct,
  insertProduct,
  getProductsById,
  updateProductById,
} from "../model/product/Product.model.js";

router.all("*", (req, res, next) => {
  next();
});

router.get("/:_id?", async (req, res) => {
  const { _id } = req.params;
  try {
    const result = _id ? await getProductsById(_id) : await getProducts();
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

router.post("/", newProductValidation, async (req, res) => {
  // console.log(req.body);
  try {
    const result = await insertProduct(req.body);

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

// UPdate product in Edit product form
router.put("/", updateProductValidation, async (req, res) => {
  const { _id, ...formDt } = req.body;
  try {
    const result = await updateProductById({ _id, formDt });
    if (result?._id) {
      res.json({
        status: "success",
        message: "This product has been updated",
        result,
      });
    }
    res.json({
      status: "error",
      message: "This product cannot updated",
      result,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    if (!req.body) {
      return res.json({
        status: "error",
        message: "Unable to update the product, Please try again later",
      });
    }
    const result = await deleteProduct(req.body);
    console.log(result);
    if (result?._id) {
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
