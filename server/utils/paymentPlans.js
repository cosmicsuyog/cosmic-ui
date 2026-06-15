export const creditPlans = [
  {
    id: "pro_200",
    name: "Pro",
    description: "More credits to build faster with no interruptions.",
    amount: 9900,
    currency: "INR",
    credits: 200,
    displayPrice: "₹99",
  },
];

export const getCreditPlan = (planId) => creditPlans.find((plan) => plan.id === planId);

export const createPaymentReceipt = (userId, planId) => {
  const userSuffix = String(userId).slice(-8);
  const timestamp = Date.now().toString(36);

  return `cu_${planId}_${userSuffix}_${timestamp}`.slice(0, 40);
};
