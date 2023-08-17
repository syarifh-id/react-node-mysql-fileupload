import express from "express";
import {
  getItems,
  getItemByID,
  addItem,
  edit,
  deleteItem,
} from "./Controllers.js";

const Router = express.Router();
Router.get("/items", getItems);
Router.get("/items/:id", getItemByID);
Router.post("/items", addItem);
Router.patch("/items/:id", edit);
Router.delete("/items/:id", deleteItem);
export default Router;
