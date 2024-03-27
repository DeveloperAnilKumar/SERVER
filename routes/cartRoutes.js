const express = require("express")
const cartRoutes = express.Router()



const {auth, isUser} = require("../middleware/auth");

const {addToCart, deleteCart, updateCart, getCartItems, removeAllCartItems} = require("../controller/cartController");
const cors = require("cors");
const app = express()

app.use(cors())
cartRoutes.post("/",auth,isUser, addToCart)
cartRoutes.delete("/",auth,isUser, deleteCart)
cartRoutes.put("/",auth,isUser, updateCart)
cartRoutes.get("/", getCartItems)
cartRoutes.post("/remove",auth, isUser, removeAllCartItems)



module.exports = cartRoutes;