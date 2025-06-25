"use client";

import axios from "axios";
import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { loadStripe } from "@stripe/stripe-js";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";

type Plan = {
  price: {
    monthly: string;
    quarterly: string;
    yearly: string;
  };
  details: string;
  overview: string;
  features: string[];
};

const Main = () => {
  const [selectedPlanName, setSelectedPlanName] = useState("Essential Plan Change");
  const [selectedPlanKey, setSelectedPlanKey] = useState("Essential Plan Change-monthly");


  const plans: Record<string, Plan> = {
    "Essential Plan Change": {
      price: {
        monthly: "$10 / mo",
        quarterly: "$27 / 3 mo",
        yearly: "$96 / yr",
      },
      details: "Essential Plan",
      overview: "The Basic Plan is perfect for freelancers who are just starting out...",
      features: [
        "Simple Profile Creation",
        "Limited Portfolio Features",
        "Basic Analytics (Profile Views, Proposal Acceptance Rates)",
        "Option to Upgrade for More Features",
      ],
    },
    "Advance Plan Change": {
      price: {
        monthly: "$15 / mo",
        quarterly: "$40.50 / 3 mo",
        yearly: "$144 / yr",
      },
      details: "Advanced Plan",
      overview: "For freelancers looking to expand their reach, the Professional Plan offers...",
      features: [
        "Advanced Portfolio Capabilities",
        "Enhanced Profile Visibility",
        "Detailed Analytics (Profile Interactions, Click-Through Rates)",
        "Flexible Subscription (Upgrade or Downgrade Options)",
      ],
    },
    "Ultimate Plan Change": {
      price: {
        monthly: "$20 / mo",
        quarterly: "$54 / 3 mo",
        yearly: "$192 / yr",
      },
      details: "Ultimate Plan",
      overview: "The Premium Plan is designed for top-tier freelancers seeking maximum exposure...",
      features: [
        "Priority Search Result Listings",
        "Access to Exclusive Job Opportunities",
        "Comprehensive Portfolio Analytics",
        "Enhanced Branding Options",
        "Premium Customer Support",
      ],
    },
  };

  return (
    <div className="bg-gray100 px-10 py-8">
      <div className="flex justify-between gap-12">
        <div className="flex flex-col gap-8 w-[60%]">
          <section>
            <div className="flex flex-col">
              <span className="text-xl font-semibold">Membership Pro</span>
              <span className="font-normal text-sm text-context">
                Your Subscription will begin today with a free 14-day trial
              </span>
            </div>
            <div className="flex w-full space-x-4 mt-4">
              {Object.keys(plans).map((plan) => (
                <PlanOption
                  key={plan}
                  title={plan}
                  price={plans[plan].price}
                  details={plans[plan].details}
                  isSelected={selectedPlanName === plan}
                  onClick={() => setSelectedPlanName(plan)}
                  selectedPriceKey={selectedPlanKey}
                  setSelectedPriceKey={setSelectedPlanKey}
                  setSelectedPlan={setSelectedPlanName}
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Overview</span>
            <span className="font-normal text-sm text-gray500">
              {plans[selectedPlanName].overview}
            </span>
          </section>

          <section className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Features</span>
            <div className="p-4 rounded-lg border border-gray300">
              <ul className="space-y-4 text-gray-700">
                {plans[selectedPlanName].features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-green500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <div className="w-[40%]">
          <SummarySection
            selectedPlanKey={selectedPlanKey}
            selectedPlanName={selectedPlanName}
            plans={plans}
          />
        </div>
      </div>
    </div>
  );
};

const PlanOption = ({
  title,
  price,
  details,
  isSelected,
  onClick,
  selectedPriceKey,
  setSelectedPriceKey,
  setSelectedPlan,
}: {
  title: string;
  price: { monthly: string; quarterly: string; yearly: string };
  details: string;
  isSelected: boolean;
  onClick: () => void;
  selectedPriceKey: string;
  setSelectedPriceKey: (key: string) => void;
  setSelectedPlan: (plan: string) => void;
}) => {
  const durations = ["monthly", "quarterly", "yearly"] as const;

  return (
    <div
      onClick={onClick}
      className={`p-5 w-full cursor-pointer bg-white rounded-lg border ${
        isSelected ? "border-blue400 drop-shadow-lg" : "border-gray200"
      } hover:border-blue400 hover:ring hover:drop-shadow-lg flex flex-col gap-4 transition-all`}
    >
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-lg text-black">{title}</span>
          <span className="text-[14px] text-context">{details}</span>
        </div>
      </div>

      <div className="text-sm text-gray700 space-y-2">
        {durations.map((duration) => {
          const key = `${title}-${duration}`;
          return (
            <label
              key={key}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPlan(title);
                setSelectedPriceKey(key);
              }}
            >
              <input
                type="radio"
                name={`price-option-${title}`}
                value={key}
                checked={selectedPriceKey === key}
                onChange={() => {
                  setSelectedPlan(title);
                  setSelectedPriceKey(key);
                }}
              />
              <span>
                <strong>{duration.charAt(0).toUpperCase() + duration.slice(1)}:</strong>{" "}
                {price[duration]}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

const SummarySection = ({
  selectedPlanKey,
  selectedPlanName,
  plans,
}: {
  selectedPlanKey: string;
  selectedPlanName: string;
  plans: Record<string, Plan>;
}) => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [pincode, setPincode] = useState("");
  const [user] = useAtom(userAtom);
  const stripePromise = loadStripe("pk_test_51RNrDlBlx68TdYadoUsxu0i9mNUadGcYhF2x16B8TTvpxDuFZlGBhLBS91FzOuyOBDIQxXzrOJlIMzHjHySIPSfv00ttE57gha");

  const getPriceValue = (): string => {
    const [planName, duration] = selectedPlanKey.split("-");
    const fullPrice = plans[planName].price[duration as keyof Plan["price"]];
    return fullPrice.split(" ")[0];
  };

  const priceValue = getPriceValue();

  const handleStartSubscription = async () => {
    const [planName, duration] = selectedPlanKey.split("-");
    const token = localStorage.getItem("freelancingPlatformAuthToken");
    console.log("Token:", token);

    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe.js failed to load");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:8000/api/payments/create-checkout-session", {
        planName: planName.replace(" Change", ""),
        planType: duration,
       email: user?.email ?? "test@gmail.com", 
        location: selectedCountry,
        pincode,
      },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Error creating Checkout session", error);
      alert("An error occurred, please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-8 bg-white -mt-24 px-8 py-10 rounded-2xl shadow">
      <div className="flex justify-between items-end">
        <span className="text-2xl font-bold">Summary</span>
      </div>
      <div className="flex flex-col gap-4">
        <SummaryItem label="Price" value={priceValue} />
        <SummaryItem label="Estimated Tax" value="$0.00" />
        <hr className="w-full border-t border-gray200 border-dashed my-2" />
        <SummaryItem label="Total after trial" value={priceValue} />
        <hr />
        <div>
          <label className="text-md font-semibold">Billing Address</label>
          <div className="mt-4">
            <div className="flex space-x-4 items-start">
              <div className="w-1/2">
                <label className="block text-context font-medium mb-1">Country</label>
                <ReactFlagsSelect selected={selectedCountry} onSelect={setSelectedCountry} className="flag-selector" />
              </div>
              <div className="w-1/2">
                <label className="block text-context font-medium mb-1">Zip Code</label>
                <input
                  type="text"
                  placeholder="type here"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="border px-3 py-2 rounded-lg w-full text-black border-gray200 placeholder-gray500 outline-none focus:ring hover:ring focus:border-blue300 hover:border-blue300 transition-all"
                />
              </div>
            </div>
            <p className="mt-2 text-sm text-context">*Taxes may apply based on your region.</p>
          </div>
        </div>
      </div>
      <button onClick={handleStartSubscription} className="w-full py-3 bg-gradient-to-r from-blue500 to-pink-500 text-white font-semibold rounded-lg hover:drop-shadow-lg transition-all">
        Start Subscription
      </button>
    </div>
  );
};

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default Main;
