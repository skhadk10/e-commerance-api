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

export const getProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.find();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteProduct = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.findByIdAndDelete(_id);
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

export const getProductsById = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.findById(_id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
