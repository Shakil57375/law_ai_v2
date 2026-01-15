import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useUpgradePlanMutation } from "../features/subscription/subscriptionApi";

export function UpgradeModal({ setShowUpgradeModal }) {
  const [upgradePlan] = useUpgradePlanMutation();
  const [loadingPlanId, setLoadingPlanId] = useState(null); // Track loading state for individual plans
  const navigate = useNavigate();

  const handleUpgrade = async (plan) => {
    setLoadingPlanId(plan); // Set loading state for the selected plan
    try {
      const response = await upgradePlan({ subscription_plan: plan }).unwrap();
      if (response?.checkout_url) {
        window.location.href = response.checkout_url; // Redirect to the checkout URL
      } else {
        toast.error(response?.Message || "Upgrade failed. Please try again.", {duration : 1000});
      }
    } catch (error) {
      console.error("Upgrade error:", error);
      toast.error("Failed to upgrade. Please try again.", {duration : 1000});
    } finally {
      setLoadingPlanId(null); // Reset loading state
    }
  };

  const plans = [
    {
      id: "one", // Corresponds to "subscription_plan": "one"
      name: "Monthly Plan",
      price: "$12.99",
      frequency: "/ per month",
      buttonText: "Upgrade Now",
      features: [
        "Unlimited use of AI planner",
        "Unlimited use of the full suite of tools",
        "Priority Support",
        "Cancel anytime",
      ],
    },
    {
      id: "two", // Corresponds to "subscription_plan": "two"
      name: "Annual Plan",
      price: "$8.30",
      frequency: "/ per month",
      billedAnnually: "Billed as $99.60 annually", // Smaller text for annual billing
      buttonText: "Upgrade Now",
      features: [
        "Unlimited use of AI planner",
        "Unlimited use of the full suite of tools",
        "Priority Support",
      ],
    },
  ];

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        className="bg-white lg:w-[850px] w-full p-8 rounded-lg shadow-lg relative dark:bg-gray-800 dark:text-white"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)} // Redirect to the previous page
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-white"
        >
          <IoMdClose className="w-6 h-6" />
        </button>

        {/* Modal Heading */}
        <h2 className="text-2xl font-bold text-center mb-8">
          Choose Your Plan
        </h2>

        {/* Pricing Options */}
        <div className="flex items-center justify-between gap-10 w-[800px] mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="w-1/2 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gray-100 dark:bg-gray-900 dark:text-white"
            >
              {/* Plan Header */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="text-4xl font-extrabold">
                  {plan.price}{" "}
                  <span className="text-base font-medium">{plan.frequency}</span>
                </p>
                {plan.billedAnnually && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {plan.billedAnnually}
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="px-6 py-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <IoIosCheckmarkCircleOutline
                        size={20}
                        className="text-[#5B1CA8]"
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-bold mt-2 text-center">
                Auto Renews Until Canceled
              </p>

              {/* Button */}
              <div className="p-6">
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-custom-blue to-custom-indigo text-white hover:opacity-90 transition-opacity"
                  disabled={loadingPlanId === plan.id}
                >
                  {loadingPlanId === plan.id
                    ? "Processing..."
                    : plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
