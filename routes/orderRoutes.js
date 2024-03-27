const express = require("express")

const orderRoutes = express.Router()
const cors = require("cors");

const app = express()

const {auth, isUser} = require("../middleware/auth");
const {createOrder, conformOrder, getAllOrders, getOrderById,updateDeliveryStatus} = require("../controller/orderController");

app.use(cors())

orderRoutes.post("/",auth, isUser, createOrder)
orderRoutes.put("/:id",auth, isUser,conformOrder )
orderRoutes.get("/all",getAllOrders )
orderRoutes.get("/:id",auth, isUser, getOrderById)
orderRoutes.put("/updateStatus/:id", updateDeliveryStatus)



module.exports = orderRoutes;