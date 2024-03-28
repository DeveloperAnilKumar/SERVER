const express = require("express");

const { auth, isAdmin } = require("../middleware/auth");
const {
  addProduct,
  editProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  getCategoryByProduct,
  searchProduct,
} = require("../controller/productController");
const productRouter = express.Router();
const cors = require("cors");
const app = express();
app.use(cors());
productRouter.post("/", auth, isAdmin, addProduct);
productRouter.put("/:id", auth, isAdmin, editProduct);
productRouter.delete("/delete/:id", auth, isAdmin, deleteProduct);
productRouter.get("/:id", getProductById);
productRouter.get("/", getAllProducts);
productRouter.get("/category/:category", getCategoryByProduct);
productRouter.get("/search/product", searchProduct);

module.exports = productRouter;
