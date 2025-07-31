"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PayPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState<string>("Professional");

  useEffect(() => {
    // Get plan from URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const planParam = params.get("plan");
      if (planParam) setPlan(planParam);
    }
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (!res.ok) throw new Error("Failed to create checkout session");
      const { sessionId, url, clientSecret } = await res.json();

      // If using Stripe Checkout, redirect to url
      if (url) {
        window.location.href = url;
        return;
      }

      // If using Payment Intents (not recommended for subscriptions), handle here
      if (clientSecret) {
        // ...handle PaymentIntent flow if needed...
      }
    } catch (err: any) {
      setError(err.message || "Payment failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 p-4">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Upgrade to {plan}</h2>
          <p className="text-gray-500">Secure payment processed by Stripe</p>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
        >
          {loading ? "Redirecting..." : `Pay for ${plan}`}
        </button>
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Your payment is secure and encrypted</p>
          <div className="flex items-center justify-center mt-2">
            <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24">
              <path fill="#635BFF" d="M12 1.75L3 6.75V17.25L12 22.25L21 17.25V6.75L12 1.75ZM12 3.25L19.5 7.5V16.5L12 20.75L4.5 16.5V7.5L12 3.25Z"/>
              <path fill="#635BFF" d="M12 7.75C10.205 7.75 8.75 9.205 8.75 11C8.75 12.795 10.205 14.25 12 14.25C13.795 14.25 15.25 12.795 15.25 11C15.25 9.205 13.795 7.75 12 7.75ZM12 9.25C12.9665 9.25 13.75 10.0335 13.75 11C13.75 11.9665 12.9665 12.75 12 12.75C11.0335 12.75 10.25 11.9665 10.25 11C10.25 10.0335 11.0335 9.25 12 9.25Z"/>
            </svg>
            <span>Powered by Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
}