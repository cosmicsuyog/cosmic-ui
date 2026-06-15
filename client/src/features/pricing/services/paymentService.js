import authClient from "../../auth/services/authService";

export const getPaymentPlansService = () => authClient.get("/payments/plans");

export const createPaymentOrderService = (planId) =>
  authClient.post("/payments/create-order", { planId });

export const verifyPaymentService = (paymentResponse) =>
  authClient.post("/payments/verify", paymentResponse);
