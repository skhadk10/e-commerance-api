import SessionSchema from "./Session.schema.js";

export const storeAccessJwt = async (newSession) => {
  try {
    const result = await SessionSchema(newSession).save();
    return result;
  } catch (error) {
    console.log(error);
  }
};
