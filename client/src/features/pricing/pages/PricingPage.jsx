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
  displayPrice: "₹99",
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
  <li className="flex items-center gap-3 text-sm font-semibold text-white/72">
    <span className="material-symbols-outlined text-warm-accent text-[18px] leading-none">
      check
    </span>
    {children}
  </li>
);

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
  const price = useMemo(() => proPlan.displayPrice || "₹99", [proPlan.displayPrice]);

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
    <div className="bg-charcoal text-white min-h-screen overflow-hidden">
      <header className="border-white/10 bg-charcoal/90 sticky top-0 z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-16">
          <Link to="/home" className="flex items-center gap-2">
            <img src="/favicon.svg" alt="Cosmic UI logo" className="h-8 w-8" />
            <span className="font-sora text-xl font-bold text-white">Cosmic UI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link to="/home" className="text-sm font-semibold text-white/62 hover:text-white">
              Home
            </Link>
            <Link to="/docs" className="text-sm font-semibold text-white/62 hover:text-white">
              Components
            </Link>
            <Link
              to="/coming-soon/showcase"
              className="text-sm font-semibold text-white/62 hover:text-white"
            >
              Showcase
            </Link>
            <span className="border-warm-accent text-sm font-bold text-white border-b-2 pb-1">
              Pricing
            </span>
          </nav>
          <Link
            to="/generate"
            className="bg-warm-accent text-charcoal-text rounded-full px-5 py-2.5 text-sm font-extrabold shadow-sm transition-transform hover:scale-105"
          >
            Generate Component
          </Link>
        </div>
      </header>

      <main className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 md:px-16 md:py-16">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute top-20 right-8 h-72 w-72 rounded-full bg-blue-soft/15 blur-3xl" />
          <div className="absolute bottom-20 left-8 h-80 w-80 rounded-full bg-warm-accent/14 blur-3xl" />
        </div>

        <section className="relative z-10 mx-auto max-w-3xl text-center">
          <Link
            to="/home"
            className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-white/54 transition-colors hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px] leading-none">arrow_back</span>
            Back
          </Link>
          <div className="bg-white/8 border-white/10 text-blue-soft mx-auto mb-6 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-extrabold tracking-widest uppercase">
            <span className="material-symbols-outlined text-[16px] leading-none">bolt</span>
            AI Credits
          </div>
          <h1 className="font-sora text-5xl font-black tracking-normal text-white md:text-7xl">
            Simple <span className="text-warm-accent">Pricing</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base font-semibold leading-7 text-white/54">
            Choose a plan that fits your workflow. Credits are used each time you generate a
            component.
          </p>
        </section>

        <section className="relative z-10 mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/[0.055] p-7 shadow-2xl">
            <div className="mb-7 flex items-center justify-between">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-extrabold text-white/62">
                Current Plan
              </span>
              <span className="material-symbols-outlined text-white/24">lock</span>
            </div>
            <h2 className="font-sora text-2xl font-extrabold text-white">Free</h2>
            <p className="mt-3 text-sm font-semibold text-white/48">
              Get started with AI-powered component generation.
            </p>
            <p className="font-sora mt-8 text-5xl font-black text-white">Free</p>
            <span className="mt-4 inline-flex rounded-lg bg-white/8 px-4 py-2 text-sm font-extrabold text-white/68">
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
              className="mt-10 flex w-full items-center justify-center gap-2 rounded-lg bg-white/8 px-5 py-4 text-sm font-extrabold text-white/46"
            >
              <span className="material-symbols-outlined text-[18px] leading-none">check</span>
              Active
            </button>
          </article>

          <article className="border-warm-accent/35 relative overflow-hidden rounded-xl border bg-gradient-to-br from-white/[0.1] to-blue-soft/10 p-7 shadow-2xl">
            <div className="bg-warm-accent/8 pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full blur-3xl" />
            <div className="relative">
              <span className="bg-blue-soft/15 text-blue-soft mb-7 inline-flex rounded-full px-4 py-2 text-sm font-extrabold">
                Most Popular
              </span>
              <h2 className="font-sora text-2xl font-extrabold text-white">{proPlan.name}</h2>
              <p className="mt-3 text-sm font-semibold text-white/52">{proPlan.description}</p>
              <p className="font-sora mt-8 text-5xl font-black text-white">{price}</p>
              <span className="bg-blue-soft/15 text-blue-soft mt-4 inline-flex rounded-lg px-4 py-2 text-sm font-extrabold">
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
                className="bg-warm-accent text-charcoal-text mt-10 w-full rounded-lg px-5 py-4 text-sm font-extrabold shadow-[0_16px_36px_rgba(232,160,110,0.22)] transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {processing
                  ? "Opening checkout..."
                  : isAuthenticated
                    ? `Buy for ${price}`
                    : "Sign in to buy"}
              </button>
            </div>
          </article>
        </section>

        {(statusMessage || errorMessage) && (
          <p
            className={`relative z-10 mx-auto max-w-2xl rounded-lg border px-4 py-3 text-center text-sm font-bold ${
              errorMessage
                ? "border-red-soft/30 bg-red-soft/10 text-red-soft"
                : "border-green-soft/30 bg-green-soft/10 text-green-soft"
            }`}
          >
            {errorMessage || statusMessage}
          </p>
        )}

        <p className="relative z-10 text-center text-sm font-semibold text-white/38">
          Credits are added to your account instantly after successful payment verification.
        </p>
      </main>
    </div>
  );
};

export default PricingPage;
