import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import { createPaymentReceipt, creditPlans, getCreditPlan } from "../utils/paymentPlans.js";
import {
  createRazorpayOrder,
  getRazorpayErrorMessage,
  verifyRazorpaySignature,
} from "../utils/razorpay.js";

export const getPaymentPlans = (_req, res) =>
  res.status(200).json({
    success: true,
    plans: creditPlans,
  });

export const createPaymentOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = getCreditPlan(planId);

    if (!plan) {
      return res.status(400).json({ message: "Invalid pricing plan selected." });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const receipt = createPaymentReceipt(user._id, plan.id);
    const notes = {
      credits: plan.credits,
      planId: plan.id,
      userId: String(user._id),
    };
    const order = await createRazorpayOrder({
      amount: plan.amount,
      currency: plan.currency,
      receipt,
      notes,
    });

    const payment = await Payment.create({
      user: user._id,
      planId: plan.id,
      planName: plan.name,
      credits: plan.credits,
      amount: plan.amount,
      currency: plan.currency,
      receipt,
      status: "created",
      razorpayOrderId: order.id,
      notes,
    });

    return res.status(201).json({
      success: true,
      keyId: order.keyId,
      paymentId: payment._id,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },
      plan,
    });
  } catch (error) {
    return res.status(500).json({
      message: getRazorpayErrorMessage(error),
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } =
      req.body;

    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({ message: "Payment verification details are required." });
    }

    const payment = await Payment.findOne({
      razorpayOrderId: orderId,
      user: req.userId,
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment order not found." });
    }

    if (payment.status === "paid") {
      const existingUser = await User.findById(req.userId).select("name email aiCredit role");

      return res.status(200).json({
        success: true,
        message: "Payment already verified.",
        creditsAdded: 0,
        user: existingUser,
      });
    }

    const isValidSignature = verifyRazorpaySignature({
      orderId,
      paymentId,
      signature,
    });

    if (!isValidSignature) {
      payment.status = "failed";
      payment.razorpayPaymentId = paymentId;
      payment.razorpaySignature = signature;
      await payment.save();

      return res.status(400).json({ message: "Invalid payment signature." });
    }

    payment.status = "paid";
    payment.razorpayPaymentId = paymentId;
    payment.razorpaySignature = signature;
    await payment.save();

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $inc: { aiCredit: payment.credits } },
      { new: true }
    ).select("name email aiCredit role");

    return res.status(200).json({
      success: true,
      message: "Payment verified and credits added.",
      creditsAdded: payment.credits,
      payment,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: getRazorpayErrorMessage(error),
    });
  }
};
