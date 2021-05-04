import CategorySchema from "./Category.schema.js";

export const insertCategories = (catObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await CategorySchema(catObj).save();

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
export const getCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await CategorySchema.find();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteCategories = (catArg) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await CategorySchema.deleteMany({ _id: { $in: catArg } });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateCategories = (Catupdate) => {
  const { _id, rename } = Catupdate;
  return new Promise(async (resolve, reject) => {
    try {
      const result = await CategorySchema.findByIdAndUpdate(
        { _id },
        { $set: { name: rename } }
      );
      console.log(result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
