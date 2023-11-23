const Payment = require("../models/payment");

// Action to create a checkout session
const createCheckoutSession = async (req, res) => {
  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const {
      products,
      customerId,
      customerEmail,
      successUrl,
      cancelUrl,
      formData,
    } = req.body;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: parseInt(product.price) * 100, // convert price to cents
      },
      quantity: product.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      client_reference_id: customerId,
      customer_email: customerEmail,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        products: JSON.stringify(products.map((product) => product._id)),
      },
    });

    if (!session) {
      throw new Error("Unable to create session");
    }

    // Retrieve the total amount from Stripe
    const totalAmount = session.amount_total / 100;

    // Save the payment to the database
    const payment = new Payment({
      user: customerId,
      products: products.map((product) => product._id),
      amount: totalAmount,
      currency: session.currency,
      paymentProvider: "stripe",
      paymentMethod: "card",
      status: "Pending",
      sessionId: session.id,
      lineItems: lineItems,
      deliveryDetails: {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        street1: formData.street1,
        street2: formData.street2,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
      },
    });

    await payment.save();

    res.send({
      sessionId: session.id,
    });
  } catch (e) {
    res
      .status(500)
      .send({ message: e.message, error: e.errors, success: false });
  }
};

// Export the action controllers
module.exports = {
  createCheckoutSession,
};
