const express = require("express");

const categoryRoutes = express.Router();
const cors = require("cors");
const app = express();

app.use(cors());

const {
  addCategory,
  editCategory,
  deleteCategory,
  getCategoryById,
  getAllCategory,
} = require("../controller/categoryController.js");
categoryRoutes.post("/", addCategory);
categoryRoutes.put("/edit/:id", editCategory);
categoryRoutes.delete("/delete/:id", deleteCategory);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.get("/", getAllCategory);

module.exports = categoryRoutes;
