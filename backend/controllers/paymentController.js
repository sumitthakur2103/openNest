import dotenv from 'dotenv';
dotenv.config();

const Razorpay = (await import('razorpay')).default;

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const createRazorpayOrder = async (req, res) => {
    const { amount } = req.body;

    console.log("Amount received:", amount);
    console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
    console.log("Key Secret:", process.env.RAZORPAY_KEY_SECRET);

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_order_${Math.random()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        console.log("Order created:", order);
        res.json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create Razorpay order", error: error.message });
    }
};
