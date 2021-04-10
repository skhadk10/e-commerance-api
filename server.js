import express from "express";
import morgan from "morgan";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(morgan("tiny"));

app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());
// LOAD ROUTERS
import loginRouter from "./routers/login.router.js";
// APIS
app.use("/api/v1/login", loginRouter);

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
