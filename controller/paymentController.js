const mongoose = require("mongoose");
const { instance } = require("../config/razorpay");
const User = require("../model/User");
const Order = require("../model/Order");
const crypto = require("crypto")

exports.capturePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const userId = req.user.id;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "please provide valid id",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "could not find the order",
      });
    }

    const amount = order.totalAmount;
    const currency = "INR";

    const option = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        orderId: orderId,
        userId,
      }
    };

    const paymentResponse = await instance.orders.create(option);


    res.status(200).json({
      success: true,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
      paymentResponse
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
      success: false,
      error: error.message,
    });
  }
};

exports.verifySignature = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

     
  const shasum = crypto.createHmac("sha256", process.env.RAZEORPAY_SECRET);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest("hex");
    

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }
    
  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });

}


