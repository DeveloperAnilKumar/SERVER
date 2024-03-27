const express = require("express");
const paymentRoute = express.Router();

const { auth, isUser } = require("../middleware/auth");

const cors = require("cors");
const { capturePayment,verifySignature } = require("../controller/paymentController");
const app = express();

app.use(cors());

paymentRoute.post("/", auth,isUser,capturePayment);
paymentRoute.post("/verifySignature", auth,isUser,verifySignature);


module.exports = paymentRoute;
