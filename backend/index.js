import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import Router from "./Routes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(Router);
app.listen(5000, () => {
  try {
    console.log("server running");
  } catch (error) {
    console.log(error);
  }
});
