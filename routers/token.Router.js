import express from "express";
import { verifyRefreshjwt } from "../helper/jwt.helper.js";
import { userAuthorization } from "../middleware/authorization.middleware.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.get("/", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).json({
        status: "error",
        message: "unathorized",
      });
    }
    // call the function to get the accessjwt
    // 1. verify storeRefreshJwt
    const decodedjwt = await verifyRefreshjwt(authorization);
    console.log(decodedjwt);
    if (decodedjwt) {
      return res.json({
        status: "success",
        message: "here is your new accessjwt",
        decodedjwt,
      });
    }
    // 2. check if it is in the database
    // 3. find out the user who the code belongs too
    // 4. create new accessjwt and store in the session table in
    res.status(403).json({
      status: "error",
      message: "unathorized",
    });
  } catch (error) {
    res.status(403).json({
      status: "error",
      message: "unathorized",
    });
  }
});
export default router;
