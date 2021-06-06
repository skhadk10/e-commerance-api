import express from "express";
const router = express.Router();

import { deleteRefreshTokenById } from "../model/user/User.model.js";
import { deleteAccessTokenById } from "../model/session/Session.model.js";

router.post("/", async (req, res, next) => {
  try {
    const { _id } = req.body;
    console.log("from router",_id);
   const deleteAccessToken= await deleteAccessTokenById(_id);
    
    const deleteRefreshToken= await deleteRefreshTokenById(_id);
    res.json({
      status: "success",
      message: "logout successfully",
      deleteAccessToken,
      deleteRefreshToken,
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

export default router;
