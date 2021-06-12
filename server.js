import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
const app = express();

const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(morgan("tiny"));

// img path
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

import mongoClient from "./config/db.js";
mongoClient();

// LOAD ROUTERS
import loginRouter from "./routers/login.router.js";
import userRouter from "./routers/user.router.js";
import categoryRouter from "./routers/category.router.js";
import ProductRouter from "./routers/product.router.js";
import tokenRouter from "./routers/token.router.js";
import logOutRouter from "./routers/LogOut.js";
// APIS
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/token", tokenRouter);
app.use("/api/v1/logOut", logOutRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// 404 return
app.use((req, res, next) => {
  const error = new Error("Resources not found");
  error.status = 404;
  next(error);
});
// Handle error
import { handleError } from "./utils/errorHandler.js";

app.use((error, req, res, next) => {
  handleError(error, res);
});

app.listen(PORT, (error) => {
  if (error) console.log(error);
  console.log(`server running at http://localhost:${PORT}`);
});
