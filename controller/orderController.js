const Order = require("../model/Order");

const Address = require("../model/Address");
const mailSender = require("../utils/MailSender");

exports.createOrder = async (req, res) => {
  try {
    const id = req.user.id;
    const {
      items,
      totalAmount,
      totalItems,
      user,
      paymentMethod,
      paymentStatus,
      status,
      firstName,
      lastName,
      email,
      mobile,
      address,
      city,
      state,
      zipCode,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !address ||
      !city ||
      !state ||
      !zipCode
    ) {
      return res.status(400).json({
        success: false,
        message: "all filed required",
      });
    }

    const newAddress = await Address.create({
      firstName,
      lastName,
      email,
      mobile,
      address,
      city,
      state,
      zipCode,
      user: id,
    });

    const order = await Order.create({
      items,
      totalAmount,
      totalItems,
      user: id,
      paymentMethod,
      address: newAddress._id,
    });

    res.status(201).json({
      message: "order placed  successfully",
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


exports.conformOrder = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Order.findOneAndUpdate(
      { _id: id },
      {
        status: "success",
      },
      { new: true }
    ).populate("user");


    const emailTemplate = generateEmailTemplate(order);

    const emailSent = await mailSender(
      order.user.email,
      "Order Details",
      emailTemplate
    );


    if (!emailSent) {
      throw new Error("Failed to send email.");
    }

    res.status(200).json({
      message: "Order placed successfully",
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to place order: " + error.message,
      success: false,
    });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "success" })
      .sort({ orderDate: -1 }); 
    res.status(200).json({
      message: "All orders fetched successfully",
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findOne({ _id: id }).populate("address");
    res.status(200).json({
      message: " order fetch successfully",
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

exports.updateDeliveryStatus = async (req, res)=>{

  try{

    const id = req.params.id

    const status = req.body.status

      const update = await Order.findOneAndUpdate({_id:id},{
        deliveryStatus:status
      } , {new:true})

res.status(200).json({
      message: " status updated  successfully",
      success: true,
      update,
    });

  }catch(error){
  res.status(500).json({
      message: error.message,
      success: false,
    });
  }

  }











function generateEmailTemplate(order) {
  const url = `http://localhost:5173/order/${order._id}`;

  const itemsHtml = order.items
    .map(
      (item) => `
      <div class="product-card">
        <div class="product-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="product-info">
          <h2>Product: ${item.name}</h2>
          <p>Price:  ${item.price}</p>
          <p>Total Amount: ${order.totalAmount}</p>
        </div>
      </div>
    `
    )
    .join("");

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Order Details - Shopping Poring</title>
        <style>
        /* Reset CSS */
        body, h1, p {
            margin: 0;
            padding: 0;
        }

        /* Responsive styles */
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
            }
        }

        /* General styles */
        .container {
            max-width: 58rem;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .logo {
            text-align: center;
            margin-bottom: 20px;
        }

        .logo img {
            max-width: 150px;
        }

        .order-details {
            font-size: 16px;
            color: #333;
            margin-bottom: 20px;
        }

        .tracking-id {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }

        .cards {
            display: flex;
            gap: 20px;
            flex-wrap: wrap; /* Added to allow cards to wrap on smaller screens */
            justify-content: center; /* Center align cards */
        }

        .product-card {
            border: 1px solid #ddd;
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 20px;
            width: calc(50% - 10px); /* Adjusted to 50% of container width with gap between cards */
            max-width: 300px; /* Added max-width for better responsiveness */
        }

        .product-image img {
            width: 100%;
            object-fit: cover; /* Adjusted to cover and maintain aspect ratio */
            border-top-left-radius: 5px; /* Rounded corners for top of image */
            border-top-right-radius: 5px;
        }

        .product-info {
            padding: 10px;
            background-color: #fff;
        }

        .product-info h2 {
            font-size: 18px;
            margin-bottom: 10px;
        }

        .product-info p {
            font-size: 16px;
            margin-bottom: 5px;
        }

        .cta-button {
            display: block;
            width: 200px;
            margin: 0 auto;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: #fff;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 20px; /* Added margin top */
        }

        .footer {
            text-align: center;
            font-size: 14px;
            color: #999;
            margin-top: 20px;
        }
    </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
          <img src="https://img.freepik.com/free-photo/shopping-cart-3d-render-icon_460848-6902.jpg?t=st=1710936038~exp=1710939638~hmac=072b39c53f21622d4ec5fe2bea65e669ea119f8c0b38471bb91dec9d19b7fd71&w=740" alt="Shopping Poring Logo">
          </div>
          <div class="order-details">
            <p>Hello, ${order.user.firstName} ${order.user.lastName}</p>
            <p>Thank you for your order! Your order details are as follows:</p>
          </div>
          <div class="tracking-id">
            Your order has been shipped with tracking ID: <strong>${order._id}</strong>.
            <a href="${url}" class="cta-button">Track Your Order</a>
          </div>
          <div class="cards">
          ${itemsHtml}
          </div>
      
          <div class="footer">
            If you have any questions or concerns about your order, please feel free to contact us.<br>
            This email was sent by Shopping Poring. Please do not reply to this email.
          </div>
        </div>
      </body>
      </html>
    `;
}


