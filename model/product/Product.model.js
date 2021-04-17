import ProdSchema from "./Product.schema.js";

export const insertProduct = (ProdObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema(ProdObj).save();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.find();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteCategories = (catArg) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.deleteMany({ _id: { $in: catArg } });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateCategories = ({ _id, name }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.findByIdAndUpdate(
        { _id },
        { $rename: { name } }
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
