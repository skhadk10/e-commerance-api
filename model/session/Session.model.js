import SessionSchema from "./Session.schema.js";

export const storeAccessJwt = async (newSession) => {
  try {
    const result = await SessionSchema(newSession).save();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const getAccessByToken = async (accessJWT) => {
  try {
    const result = await SessionSchema.findOne({ accessJWT });
    return Promise.resolve(result);
  } catch (error) {
    return Promise.resolve(false);
  }
};
export const deleteAccessTokenById = async (userId) => {
  try {
    console.log("from session",userId);
    const result = await SessionSchema.findOneAndDelete( {userId} );
    return Promise.resolve(result);
  } catch (error) {
    console.log(error);
  }
};
