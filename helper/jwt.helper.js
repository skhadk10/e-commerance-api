import jwt from "jsonwebtoken";
import { storeAccessJwt } from "../model/session/Session.model.js";
import { storeRefreshJwt } from "../model/user/User.model.js";
export const createAccessJWT = (email, _id) => {
  return new Promise(async (resolve, reject) => {
    try {
      var accessJWT = await jwt.sign(
        { email },
        process.env.JWT_ACCESS_SECRECT,
        {
          expiresIn: "15m",
        }
      );

      if (accessJWT) {
        const newSession = {
          accessJWT,
          userId: _id,
        };
        // save new token in session of database
        storeAccessJwt(newSession);
      }
      resolve(accessJWT);
    } catch (error) {
      reject(error);
    }
  });
};
export const createRefreshJWT = (email, _id) => {
  return new Promise(async (resolve, reject) => {
    try {
      var refreshJWT = await jwt.sign(
        { email },
        process.env.JWT_REFRESH_SECRECT,
        {
          expiresIn: "30d",
        }
      );
      storeRefreshJwt(_id, refreshJWT);

      resolve(refreshJWT);
    } catch (error) {
      reject(error);
    }
  });
};
export const verifyAccessjwt = (accessJWT) => {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(accessJWT, process.env.JWT_ACCESS_SECRECT);
      resolve(decoded);
    } catch (error) {
      reject(error);
    }
  });
};

export const verifyRefreshjwt = (accessJWT) => {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(accessJWT, process.env.JWT_REFRESH_SECRECT);
      resolve(decoded);
    } catch (error) {
      reject(error);
    }
  });
};

// store in database
