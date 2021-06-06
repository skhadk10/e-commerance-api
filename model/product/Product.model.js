import ProdSchema from "./Product.schema.js";

export const insertProduct = (ProdObj) => {
  console.log(ProdObj);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema(ProdObj).save();
      console.log(result, "from product model")
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
// UPdate product in Edit product form// UPdate product in Edit product form
export const updateProductById = ({ _id, formDt }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.findByIdAndUpdate(
        { _id },
        { $set: formDt },
        { new: true }
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
