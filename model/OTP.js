const mongoose = require("mongoose");
const mailSender = require("../utils/MailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expire: 5 * 60,
  },
});

async function sendVerificationEmail(email, otp) {
  const emailContect = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shopping Poring - One-Time Password (OTP)</title>
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
                max-width: 600px;
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
    
            .otp {
                text-align: center;
                font-size: 36px;
                margin-bottom: 20px;
                color: #333;
            }
    
            .note {
                text-align: center;
                font-size: 18px;
                color: #666;
                margin-bottom: 30px;
            }
    
            .footer {
                text-align: center;
                font-size: 14px;
                color: #999;
                margin-top: 20px;
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
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <img src="https://img.freepik.com/free-photo/shopping-cart-3d-render-icon_460848-6902.jpg?t=st=1710936038~exp=1710939638~hmac=072b39c53f21622d4ec5fe2bea65e669ea119f8c0b38471bb91dec9d19b7fd71&w=740" alt="Shopping Poring Logo">
            </div>
            <div class="otp">
                Your One-Time Password (OTP) for Shopping Portal:
                <br>
                <strong>${otp}</strong>
            </div>
            <div class="note">
                Please use the above OTP to securely complete your registration.
            </div>
           
            <div class="footer">
                This email was sent by Shopping Portal. Please do not reply to this email.
            </div>
        </div>
    </body>
    </html>
    `;

  try {
    const response = await mailSender(
      email,
      " Otp  Verification ",
      emailContect
    );
  } catch (error) {
    console.log(error);
    console.log("issue with email sending");
  }
}

otpSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
