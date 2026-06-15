/* eslint-disable complexity */
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { initializeAuth } from "../../auth/auth.slice";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  createPaymentOrderService,
  getPaymentPlansService,
  verifyPaymentService,
} from "../services/paymentService";

const RAZORPAY_CHECKOUT_URL = "https://checkout.razorpay.com/v1/checkout.js";
const fallbackProPlan = {
  id: "pro_200",
  name: "Pro",
  amount: 9900,
  currency: "INR",
  credits: 200,
  displayPrice: "Rs 99",
  description: "More credits to build faster with no interruptions.",
};

const freeFeatures = [
  "150 AI Credits included",
  "Save components",
  "Preview and export code",
  "Community support",
];

const proFeatures = [
  "200 AI Credits added",
  "Save components",
  "Preview and export code",
  "Priority support",
];

const loadRazorpayCheckout = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(`script[src="${RAZORPAY_CHECKOUT_URL}"]`);

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true), { once: true });
      existingScript.addEventListener("error", () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_CHECKOUT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || error.response?.data?.error || error.message || fallback;

const PlanFeature = ({ children }) => (
  <li className="text-text-secondary flex items-center gap-3 text-sm font-semibold">
    <span className="bg-green-soft text-charcoal-text flex h-6 w-6 items-center justify-center rounded-full">
      <span className="material-symbols-outlined text-[16px] leading-none">check</span>
    </span>
    {children}
  </li>
);

const getBuyButtonLabel = ({ isAuthenticated, price, processing }) => {
  if (processing) {
    return "Opening checkout...";
  }

  if (isAuthenticated) {
    return `Buy for ${price}`;
  }

  return "Sign in to buy";
};

const PricingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [proPlan, setProPlan] = useState(fallbackProPlan);
  const [processing, setProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const currentCredits = user?.aiCredit ?? 150;
  const userDisplayName = user?.displayName || user?.name || "Creator";
  const price = useMemo(() => proPlan.displayPrice || "Rs 99", [proPlan.displayPrice]);
  const buyButtonLabel = getBuyButtonLabel({ isAuthenticated, price, processing });

  useEffect(() => {
    let isMounted = true;

    getPaymentPlansService()
      .then((response) => {
        const plan = response.data?.plans?.find((item) => item.id === fallbackProPlan.id);

        if (isMounted && plan) {
          setProPlan(plan);
        }
      })
      .catch(() => {
        /* Keep the local fallback plan when the API is unavailable. */
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const syncUserCredits = (nextUser) => {
    if (!nextUser) {
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    localStorage.setItem("user", JSON.stringify({ ...storedUser, ...nextUser }));
    dispatch(initializeAuth());
  };

  const verifyCheckoutPayment = async (paymentResponse) => {
    const response = await verifyPaymentService(paymentResponse);
    syncUserCredits(response.data?.user);
    setStatusMessage(`${response.data?.creditsAdded || proPlan.credits} credits added.`);
    setErrorMessage("");
    setProcessing(false);
  };

  const handleBuyPlan = async () => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    setProcessing(true);
    setStatusMessage("");
    setErrorMessage("");

    try {
      const checkoutLoaded = await loadRazorpayCheckout();

      if (!checkoutLoaded) {
        throw new Error("Could not load Razorpay checkout.");
      }

      const response = await createPaymentOrderService(proPlan.id);
      const { keyId, order, plan } = response.data;
      const checkout = new window.Razorpay({
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Cosmic UI",
        description: `${plan.name} - ${plan.credits} AI Credits`,
        order_id: order.id,
        prefill: {
          name: userDisplayName,
          email: user?.email || "",
        },
        theme: {
          color: "#e8a06e",
        },
        handler: verifyCheckoutPayment,
        modal: {
          ondismiss: () => {
            setProcessing(false);
            setStatusMessage("Payment cancelled.");
          },
        },
      });

      checkout.on("payment.failed", (failure) => {
        setProcessing(false);
        setErrorMessage(failure.error?.description || "Payment failed.");
      });
      checkout.open();
    } catch (error) {
      setProcessing(false);
      setErrorMessage(getErrorMessage(error, "Unable to start payment."));
    }
  };

  return (
    <div className="bg-soft-cream-bg text-charcoal-text min-h-screen overflow-hidden">
      <header className="border-outline-variant/40 bg-soft-cream-bg/90 sticky top-0 z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-16">
          <Link to="/home" className="flex items-center gap-2">
            <img src="/favicon.svg" alt="Cosmic UI logo" className="h-8 w-8" />
            <span className="navbar-brand-text">Cosmic UI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              to="/home"
              className="type-body-sm text-text-secondary hover:text-charcoal-text font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/docs"
              className="type-body-sm text-text-secondary hover:text-charcoal-text font-medium transition-colors"
            >
              Components
            </Link>
            <span className="type-body-sm text-charcoal-text border-warm-accent border-b-2 pb-0.5 font-bold">
              Pricing
            </span>
          </nav>
          <Link
            to="/generate"
            className="bg-warm-accent type-label-md text-charcoal-text rounded-full px-5 py-2.5 font-semibold shadow-sm transition-all hover:scale-105 hover:shadow-md"
          >
            Generate Component
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 md:px-16 md:py-16">
        <section className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Link
            to="/home"
            className="text-text-secondary hover:text-charcoal-text mb-5 inline-flex items-center gap-2 self-start text-sm font-bold transition-colors sm:self-center"
          >
            <span className="material-symbols-outlined text-[18px] leading-none">arrow_back</span>
            Back
          </Link>
          <div className="bg-highlight-pink/50 border-outline-variant/50 text-charcoal-text mb-6 inline-flex max-w-full items-center justify-center gap-2 rounded-full border px-5 py-2 text-xs font-extrabold tracking-widest uppercase">
            <span className="material-symbols-outlined text-warm-accent text-[16px] leading-none">
              bolt
            </span>
            AI Credits
          </div>
          <h1 className="font-sora text-charcoal-text text-5xl font-black tracking-normal md:text-7xl">
            Simple <span className="text-warm-accent">Pricing</span>
          </h1>
          <p className="type-body-lg text-text-secondary mx-auto mt-5 max-w-xl">
            Choose a plan that fits your workflow. Credits are used each time you generate a
            component.
          </p>
        </section>

        <section className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-2">
          <article className="border-outline-variant rounded-xl border bg-white p-7 shadow-lg">
            <div className="mb-7 flex items-center justify-between">
              <span className="bg-surface-container-high text-text-secondary rounded-full px-4 py-2 text-sm font-extrabold">
                Current Plan
              </span>
              <span className="material-symbols-outlined text-text-tertiary">lock</span>
            </div>
            <h2 className="font-sora text-charcoal-text text-2xl font-extrabold">Free</h2>
            <p className="text-text-secondary mt-3 text-sm font-semibold">
              Get started with AI-powered component generation.
            </p>
            <p className="font-sora text-charcoal-text mt-8 text-5xl font-black">Free</p>
            <span className="bg-surface-container-low border-outline-variant text-charcoal-text mt-4 inline-flex rounded-lg border px-4 py-2 text-sm font-extrabold">
              {currentCredits} AI Credits
            </span>
            <ul className="mt-8 space-y-4">
              {freeFeatures.map((feature) => (
                <PlanFeature key={feature}>{feature}</PlanFeature>
              ))}
            </ul>
            <button
              type="button"
              disabled
              className="bg-surface-container-high text-text-tertiary mt-10 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-4 text-sm font-extrabold"
            >
              <span className="material-symbols-outlined text-[18px] leading-none">check</span>
              Active
            </button>
          </article>

          <article className="border-warm-accent/70 bg-surface-container-lowest relative overflow-hidden rounded-xl border p-7 shadow-xl">
            <span className="bg-warm-accent absolute top-0 right-0 left-0 h-1" />
            <div className="relative">
              <span className="bg-warm-accent/20 text-charcoal-text mb-7 inline-flex rounded-full px-4 py-2 text-sm font-extrabold">
                Most Popular
              </span>
              <h2 className="font-sora text-charcoal-text text-2xl font-extrabold">
                {proPlan.name}
              </h2>
              <p className="text-text-secondary mt-3 text-sm font-semibold">
                {proPlan.description}
              </p>
              <p className="font-sora text-charcoal-text mt-8 text-5xl font-black">{price}</p>
              <span className="bg-blue-soft/70 text-charcoal-text mt-4 inline-flex rounded-lg px-4 py-2 text-sm font-extrabold">
                {proPlan.credits} AI Credits
              </span>
              <ul className="mt-8 space-y-4">
                {proFeatures.map((feature) => (
                  <PlanFeature key={feature}>{feature}</PlanFeature>
                ))}
              </ul>
              <button
                type="button"
                onClick={handleBuyPlan}
                disabled={processing}
                className="bg-warm-accent text-charcoal-text mt-10 w-full rounded-lg px-5 py-4 text-sm font-extrabold shadow-md transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {buyButtonLabel}
              </button>
            </div>
          </article>
        </section>

        {(statusMessage || errorMessage) && (
          <p
            className={`mx-auto max-w-2xl rounded-lg border px-4 py-3 text-center text-sm font-bold ${
              errorMessage
                ? "border-red-soft bg-red-soft/40 text-red-700"
                : "border-green-soft bg-green-soft/60 text-on-surface-variant"
            }`}
          >
            {errorMessage || statusMessage}
          </p>
        )}

        <p className="text-text-secondary text-center text-sm font-semibold">
          Credits are added to your account instantly after successful payment verification.
        </p>
      </main>
    </div>
  );
};

export default PricingPage;
