import mongoose from "mongoose";
const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      default: "",
    },
    ParentCat: {
      type: String,
      require: true,
      default: "",
    },
    //   childCats: [
    //     {
    //       name: {
    //         type: string,
    //         require: true,
    //         default: "",
    //       },
    //     },
    //   ],
  },
  {
    timestamp: true,
  }
);
const CatSchema = mongoose.model("Category", CategorySchema);
export default CatSchema;
