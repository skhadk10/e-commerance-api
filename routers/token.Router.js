import express from "express";
import { createAccessJWT, verifyRefreshjwt } from "../helper/jwt.helper.js";
import { userAuthorization } from "../middleware/authorization.middleware.js";
import {} from "../helper/jwt.helper.js";
import { getUserByEmail } from "../model/user/User.model.js";
const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

// receive refreshJWT and return new accessJWT
router.get("/", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      // call the function to get the accessjwt

      // 1. verify storeRefreshJwt

      const { email } = await verifyRefreshjwt(authorization);
      console.log({ email });
      // 3. find out the user who the code belongs too

      if (email) {
        // 2. check if it is in the database

        const user = await getUserByEmailAndRefreshJWT({
          email,
          refreshJWT: authorization,
        });

        if (user._id) {
          const tokenExp = user.refreshJWT.addedAt;
          tokenExp.setDate(
            tokenExp.getDate() + +process.env.JWT_REFRESH_SECRECT_EXP_DAY
          );
          const today = Date.now();
          // check if the token is still valid

          if (tokenExp > today) {
            // 4. create new accessjwt and store in the session table in db
            const accessJwt = await createAccessJWT(email, user._id);
            console.log(accessJwt);
            return res.json({
              status: "success",
              message: "here is your new accessjwt",
              accessJwt,
            });
          }
        }
      }
    }
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
router.post("/", async (req, res, next) => {
  try {
    const { token } = req.body;
    if (token) {
      // call the function to get the accessjwt

      // 1. verify storeRefreshJwt

      const { email } = await verifyRefreshjwt(token);

      // 3. find out the user who the code belongs too

      if (email) {
        // 2. check if it is in the database

        const user = await getUserByEmail(email);
        res.json({
          status: "success",
          message: "userprofile is done",
          user
        });
      }
    }
    res.json({
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
