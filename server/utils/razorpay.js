import crypto from "node:crypto";

import axios from "axios";

const RAZORPAY_API_URL = "https://api.razorpay.com/v1";

const getRazorpayCredentials = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay keys are not configured.");
  }

  return { keyId, keySecret };
};

export const createRazorpayOrder = async ({ amount, currency, receipt, notes }) => {
  const { keyId, keySecret } = getRazorpayCredentials();
  const response = await axios.post(
    `${RAZORPAY_API_URL}/orders`,
    {
      amount,
      currency,
      receipt,
      notes,
    },
    {
      auth: {
        username: keyId,
        password: keySecret,
      },
    }
  );

  return {
    ...response.data,
    keyId,
  };
};

export const verifyRazorpaySignature = ({ orderId, paymentId, signature }) => {
  const { keySecret } = getRazorpayCredentials();
  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  const receivedSignature = String(signature || "");

  if (expectedSignature.length !== receivedSignature.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, "utf8"),
    Buffer.from(receivedSignature, "utf8")
  );
};

export const getRazorpayErrorMessage = (error) =>
  error.response?.data?.error?.description ||
  error.response?.data?.message ||
  error.message ||
  "Razorpay request failed.";
