import express from "express";
const router = express.Router();
import slugify from "slugify";
import multer from "multer";
import {
  newProductValidation,
  updateProductValidation,
} from "../middleware/formValidation.midleware.js";
// Multer configuration
const ALLOWED_FILE_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let error = null;
    // get file types req.mimetype
    const isAllowed = ALLOWED_FILE_TYPE[file.mimetype];
    if (!isAllowed) {
      error = new Error(
        "Some of the file types are not allowed only images are allowed"
      );
      error.status = 400;
    }

    cb(error, "public/img/product");
  },
  filename: function (req, file, cb) {
    const fileName = slugify(file.originalname.split(".")[0]);
    const extension = ALLOWED_FILE_TYPE[file.mimetype];
    const fullFileName = fileName + "-" + Date.now() + "." + extension;
    cb(null, fullFileName);
  },
});

var upload = multer({ storage: storage });
// End
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
// for displaying in product (in frontend)
router.get("/:_id?", async (req, res) => {
  console.log(" product roputer", req.params);
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

router.post(
  "/",
  upload.array("images", 5),
  newProductValidation,
  async (req, res) => {
    try {
      const addNewProd = {
        ...req.body,
        slug: slugify(req.body.name),
      };

      const basePath = `${req.protocol}://${req.get("host")}/img/product/`;
      const files = req.files;

      const images = [];

      files.map((file) => {
        const imgFulPath = basePath + file.filename;
        images.push(imgFulPath);
      });

      const result = await insertProduct({ ...addNewProd, images });

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
  
      });
    } catch (error) {
      throw error;
    }
  }
);

// UPdate product in Edit product form
router.put("/", updateProductValidation, async (req, res) => {
  try {
    console.log("update product",files);
    const { _id, ...formDt } = req.body;
    const { imgToDelete } = formDt;
    // code to receive images

    const basePath = `${req.protocol}://${req.get("host")}/img/product`;
    const files = req.files;
    // console.log(files);

    const images = [];
    // get images from database ad filter here

    files.map((file) => {
      const imgFulPath = basePath + file.filename;
      images.push(imgFulPath);
    });

    if (imgToDelete?.length) {
      const deleteImgsource = imgToDelete.split(",");
      // get the product from database
      const prod = await getProductsById(_id);

      if (prod.images.length) {
        const updatingimages = prod.images.filter(
          (imgsource) => !deleteImgsource.includes(imgsource)
        );
        images = [...images, ...updatingimages];
      }
      // images is comming from frontend to remove from database
      // prod.images is comming from database, the old images
      // now, we need to filter Prod.images based on imgToDelete
    }

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
    // console.log(result);
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
