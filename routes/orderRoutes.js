const express = require("express")

const orderRoutes = express.Router()
const cors = require("cors");

const app = express()

const {auth, isUser} = require("../middleware/auth");
const {createOrder, conformOrder, getAllOrders, getOrderById,updateDeliveryStatus, getAllReceivedOrders} = require("../controller/orderController");

app.use(cors())

orderRoutes.post("/",auth, isUser, createOrder)
orderRoutes.put("/:id",auth, isUser,conformOrder )
orderRoutes.get("/all/:userId",getAllOrders )
orderRoutes.get("/:id" , getOrderById)
orderRoutes.put("/updateStatus/:id", updateDeliveryStatus)
orderRoutes.get("/received/orders",getAllReceivedOrders)



module.exports = orderRoutes;