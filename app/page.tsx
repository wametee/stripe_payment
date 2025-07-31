"use client";

import React from "react";

export default function Home() {
  const pricing = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying KaiNote",
      features: [
        "120 minutes of AI transcription",
        "Valid for 1 month only",
        "Basic meeting recording",
        "Action item extraction",
        "Email reminders",
        "Client summaries",
        "AI features blocked after trial",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Professional",
      price: "$29",
      description: "For growing freelancers",
      features: [
        "1,800 minutes of AI transcription",
        "Unlimited meetings",
        "Live transcription",
        "Meeting Bot automation",
        "Smart scheduling",
        "Financial dashboard",
        "Client management",
        "Time tracking",
        "AI document generation",
      ],
      cta: "Pay",
      popular: true,
    },
    {
      name: "Professional Plus",
      price: "$49",
      description: "For high-volume freelancers",
      features: [
        "3,000 minutes of AI transcription",
        "Unlimited meetings",
        "Live transcription",
        "Meeting Bot automation",
        "Smart scheduling",
        "Financial dashboard",
        "Client management",
        "Time tracking",
        "AI document generation",
        "Priority support",
        "Advanced automation",
      ],
      cta: "Pay",
      popular: false,
    },
  ];

  function CheckCircleIcon(props: any) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Choose the perfect plan for your business
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Start free, scale as you grow. All plans include our core AI features.
          </p>
        </div>

        <div className="mt-16 space-y-4 sm:mt-20 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-6xl lg:mx-auto">
          {pricing.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-white border rounded-xl shadow-lg divide-y divide-gray-200 ${
                tier.popular
                  ? 'border-primary-500 ring-2 ring-primary-500 transform scale-105'
                  : 'border-gray-200'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-gradient-to-r from-primary-500 to-purple-600 text-white">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl leading-6 font-bold text-gray-900">{tier.name}</h2>
                <p className="mt-2 text-sm text-gray-500">{tier.description}</p>
                <p className="mt-6">
                  <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                  {tier.price !== '$0' && <span className="text-lg font-medium text-gray-500">/month</span>}
                </p>
                <button
                  className={`mt-6 block w-full border border-transparent rounded-lg py-3 px-6 text-center text-sm font-semibold transition-colors ${
                    tier.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                  onClick={() => {
                    if (tier.price !== "$0") {
                      window.location.href = `/pay?plan=${encodeURIComponent(tier.name)}`;
                    }
                  }}
                >
                  {tier.price === "$0" ? "Current Plan" : tier.cta}
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
                <ul className="mt-4 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <CheckCircleIcon className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}
