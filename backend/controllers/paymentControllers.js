const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PLAN_PRICE_MAPPING = {
  "Essential Plan": {
    monthly: "price_1ROmf3Blx68TdYadG4WHZ19C",
    quarterly: "price_1ROmfbBlx68TdYadaxFpEtie",
    yearly: "price_1ROmfuBlx68TdYadkbdJxyXQ",
  },
  "Advance Plan": {
    monthly: "price_1ROmhXBlx68TdYad0kVyvZ1e",
    quarterly: "price_1ROmhyBlx68TdYadbY9iYa5L",
    yearly: "price_1ROmiJBlx68TdYadKchdhQd7",
  },
  "Ultimate Plan": {
    monthly: "price_1ROmjPBlx68TdYadeB6ZJriy",
    quarterly: "price_1ROmjkBlx68TdYadbi1mhZI0",
    yearly: "price_1ROmk1Blx68TdYadz068XlM6",
  },
};

exports.createCheckoutSession = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { planName, planType, email, location, pincode } = req.body;

    if (!planName || !planType || !email) {
      console.log("Missing required fields");
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (!PLAN_PRICE_MAPPING[planName] || !PLAN_PRICE_MAPPING[planName][planType]) {
      console.log("Invalid plan or plan type");
      return res.status(400).json({ success: false, message: "Invalid plan or plan type" });
    }

    const priceId = PLAN_PRICE_MAPPING[planName][planType];
    console.log("Using priceId:", priceId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      metadata: { location, pincode },
      success_url: `${process.env.FRONTEND_API}/payment-success`,
  cancel_url: `${process.env.FRONTEND_API}/payment-failure`,
    });

    console.log("Session created:", session.id);
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

