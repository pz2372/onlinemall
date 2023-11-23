const Payment = require("../models/payment");
const { sendMail } = require("../utils/sendMail");

const stripeHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_KEY
    );
  } catch (err) {
    console.log("error", err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  handleStripeEvent(event);

  res.json({ received: true });
};

const handleStripeEvent = async (event) => {
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Retrieve your payment record based on the session ID
    const payment = await Payment.findOne({ sessionId: session.id }).populate([
      {
        path: "products",
        populate: ["colors", "sizes"],
      },
      {
        path: "user",
        select: "firstName lastName email avatar",
      },
    ]);

    // Update the payment status in your database
    payment.status = "Completed";
    payment.paymentIntentId = session.payment_intent;
    await payment.save();

    sendOrderConfirmationEmail(session.customer_email, payment);
  }

  // Handle other webhooks here...
};

const sendOrderConfirmationEmail = async (userEmail, payment) => {
  const fullName = payment.user.firstName + " " + payment.user.lastName;
  const orderId = payment._id;
  const TotalAmount = payment.amount;

  const mailOptions = {
    from: `"Siilk" <${process.env.NODEMAILER_USER}>`,
    to: userEmail,
    subject: "Order Confirmation",
    html: `
    <!DOCTYPE html>
    <html>
    
    <head>
      <title>Order Confirmation</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style type="text/css">
        body,
        table,
        td,
        a {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
    
        table,
        td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
    
        img {
          -ms-interpolation-mode: bicubic;
        }
    
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
        }
    
        table {
          border-collapse: collapse !important;
        }
    
        body {
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
        }
    
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }

        .btn {
          -webkit-transition-duration:.8s;
          -moz-transition-duration:.8s;
          -o-transition-duration:.8s;
          transition-duration:.8s;
          -webkit-transition-property:color;
          -moz-transition-property:color;
          -o-transition-property:color;
          transition-property: color;
            display:inline-block;
            padding:4px 12px;
            margin-bottom:0;
            font-size:14px;
            line-height:20px;
            color:#333;
            text-align:center;
            text-shadow:0 1px 1px rgba(255,255,255,0.75);
            vertical-align:middle;
            cursor:pointer;
            background-color:#f5f5f5;
            background-image:-moz-linear-gradient(top,#fff,#e6e6e6);
            background-image:-webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));
            background-image:-webkit-linear-gradient(top,#fff,#e6e6e6);
            background-image:-o-linear-gradient(top,#fff,#e6e6e6);
            background-image:linear-gradient(to bottom,#fff,#e6e6e6);
            background-repeat:repeat-x;
            border:1px solid #ccc;
            border-color:#e6e6e6 #e6e6e6 #bfbfbf;
            border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);
            border-bottom-color:#b3b3b3;
            -webkit-border-radius:4px;
            -moz-border-radius:4px;
            border-radius:4px;
            -webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
            -moz-box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
            box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
            padding:11px 19px;
            font-size:17.5px;
            -webkit-border-radius:6px;
            -moz-border-radius:6px;
            border-radius:6px
        }
    
        @media screen and (max-width: 480px) {
          .mobile-hide {
            display: none !important;
          }
    
          .mobile-center {
            text-align: center !important;
          }
        }
    
        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }
      </style>
    </head>
    
    <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
    
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
    
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
              <!-- Header -->
              <tr>
                <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#F44336">
    
                  <!-- Siilk Logo -->
                  <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                      <tr>
                        <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                          <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">Siilk</h1>
                        </td>
                      </tr>
                    </table>
                  </div>
    
                  <!-- Shop Link -->
                  <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                      <tr>
                        <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                          <table cellspacing="0" cellpadding="0" border="0" align="right">
                            <tr>
                              <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                <p style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;">
                                  <a href="#" target="_blank" style="color: #ffffff; text-decoration: none;">Shop &nbsp;</a>
                                </p>
                              </td>
                              <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                <a href="#" target="_blank" style="color: #ffffff; text-decoration: none;">
                                  <img src="https://img.icons8.com/color/48/000000/small-business.png" width="27" height="23" style="display: block; border: 0px;" />
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </div>
    
                </td>
              </tr>
              <!-- Order Confirmation Content -->
              <tr>
                <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                    <tr>
                      <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                        <!-- Order Confirmation Image -->
                        <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                        <!-- Order Confirmation Message -->
                        <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                          Thank You For Your Order!
                        </h2>
                      </td>
                    </tr>
                    <!-- Additional Information -->
                    <tr>
                      <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                        <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                        Hi ${fullName}, thank you for your order!
                        Just a quick update... your order is now on its way to you. It will be with you soon, but if you want to keep an eye on it, you can click here ${orderId} to the following journey.
                        In the meantime, click here Yourlogo.com to see what's new on-site. Go on. We will be happy to see you there. If there is anything else we can do, just let us know.
                        </p>
                      </td>
                    </tr>
                    <!-- Order Summary -->
                    <tr>
                      <td align="left" style="padding-top: 20px;">
                        <table cellspacing="0" cellpadding="0" border="0" width="100%">
                          <!-- Order Confirmation Number -->
                          <tr>
                            <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                              Order Summary #
                            </td>
                          </tr>
                          <tr>
                            <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                            Purchased Items
                            </td>
                            <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                            ${payment.products.length}
                            </td>
                          </tr>
                          
                          <!-- Products -->
                          ${
                            payment.products &&
                            payment.products.map(
                              (product) => `
                              <!-- Purchased Items -->
                          <tr>
                            <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                              Product Name
                            </td>
                            <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                              ${product.name}
                            </td>
                          </tr>
                          <tr>
                            <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                              Price
                            </td>
                            <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                            ${product.price}
                          </td>
                          </tr>
                          `
                            )
                          }
                        </table>
                      </td>
                    </tr>
                    <!-- Total -->
                    <tr>
                      <td align="left" style="padding-top: 20px;">
                        <table cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                              TOTAL
                            </td>
                            <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                              ${TotalAmount}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <a class='btn' href='${process.env.BASE_URL}'>View Order</a>
    `,
  };

  const mailOptionsAdmin = {
    from: `"Siilk" <${process.env.NODEMAILER_USER}>`,
    to: "admin@gmail.com", // replace with admin email
    subject: "New Order Received",
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        p {
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>New Order Received</h2>
        <p>Hello Admin,</p>
        <p>We have received a new order. Below are the details:</p>

        <table cellspacing="0" cellpadding="0" width="100%">
            <tr>
                <td><strong>Order ID:</strong></td>
                <td>${orderId}</td>
            </tr>
            <tr>
                <td><strong>Customer Name:</strong></td>
                <td>${fullName}</td>
            </tr>
            ${
              payment.products &&
              payment.products.map(
                (product) => `
            <tr>
                <td><strong>Product:</strong></td>
                <td>${product.name}</td>
            </tr>
                `
              )
            }
            <tr>
                <td><strong>Total Amount:</strong></td>
                <td>${TotalAmount}</td>
            </tr>
        </table>
    </div>
</body>
</html>

    `,
  };

  await sendMail(mailOptions);

  await sendMail(mailOptionsAdmin);
};

module.exports = {
  stripeHandler,
};
