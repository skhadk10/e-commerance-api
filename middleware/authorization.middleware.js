import { verifyAccessjwt } from "../helper/jwt.helper.js";
import { getAccessByToken } from "../model/session/Session.model.js";
export const getUserSession = (accessJWT) => {
  return new Promise(async (resolve, reject) => {
    const sessionInfo = await getAccessByToken(accessJWT);
    resolve(sessionInfo);
  });
};
export const userAuthorization = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const verifyToken = await verifyAccessjwt(authorization);
    console.log(">>>>>>>>>>>", verifyToken);
    if (!verifyToken?.email) {
      return res.send(403).json({
        status: "error",
        message: "unauthorised",
      });
    }
    // check if token is exist in database
    const info = await getUserSession(authorization);
    console.log(info);
    console.log("inof>>>>>>>>>>>", info);
    if (info.userId) {
      req.body._id = info.userId;
      return next();
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
