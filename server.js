import express from "express";
import morgan from "morgan";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, (error) => {
  if (error) console.log(error);
  console.log(`server running at http://localhost:${PORT}`);
});
