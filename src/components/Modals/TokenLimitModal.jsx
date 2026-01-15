import React from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useUpgradePlanMutation } from '../../features/subscription/subscriptionApi';
import { useAuth } from '../../context/AuthContext';

export function TokenLimitModal() {
  const [upgradePlan] = useUpgradePlanMutation();
  const navigate = useNavigate();
  const { closeTokenLimitModal } = useAuth();
  const [loadingPlanId, setLoadingPlanId] = React.useState(null);

  const handleUpgrade = async (plan) => {
    setLoadingPlanId(plan);
    try {
      const response = await upgradePlan({ subscription_plan: plan }).unwrap();
      if (response?.checkout_url) {
        window.location.href = response.checkout_url;
      } else {
        toast.error(response?.Message || 'Upgrade failed. Please try again.', {
          duration: 1000,
        });
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      toast.error('Failed to upgrade. Please try again.', { duration: 1000 });
    } finally {
      setLoadingPlanId(null);
    }
  };

  const plans = [
    {
      id: 'one',
      name: 'Monthly Plan',
      price: '$12.99',
      frequency: '/ per month',
      buttonText: 'Upgrade Now',
      features: [
        'Unlimited use of AI planner',
        'Unlimited use of the full suite of tools',
        'Priority Support',
        'Cancel anytime',
      ],
    },
    {
      id: 'two',
      name: 'Annual Plan',
      price: '$8.30',
      frequency: '/ per month',
      billedAnnually: 'Billed as $99.60 annually',
      buttonText: 'Upgrade Now',
      features: [
        'Unlimited use of AI planner',
        'Unlimited use of the full suite of tools',
        'Priority Support',
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
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={closeTokenLimitModal}
      />

      {/* Modal */}
      <motion.div
        className="bg-white lg:w-[850px] w-full p-8 rounded-lg shadow-lg relative dark:bg-gray-800 dark:text-white max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <button
          onClick={closeTokenLimitModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-white dark:hover:text-gray-400 transition-colors"
        >
          <IoMdClose className="w-6 h-6" />
        </button>

        {/* Modal Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
            Token Limit Reached
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            You&apos;ve reached your free token limit of 1,500,000 tokens.
            Upgrade your plan to continue using our services.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-8 rounded">
          <p className="text-yellow-800 dark:text-yellow-200">
            <strong>Note:</strong> Upgrading to a paid plan gives you unlimited
            access to all our AI tools and features.
          </p>
        </div>

        {/* Pricing Options */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex-1 border-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:border-[#15B8A6] bg-gray-50 dark:bg-gray-900 dark:text-white"
            >
              {/* Plan Header */}
              <div className="p-6 text-center border-b">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {plan.frequency}
                  </span>
                </div>
                {plan.billedAnnually && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {plan.billedAnnually}
                  </p>
                )}
              </div>

              {/* Features List */}
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-500 text-xl mt-1">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Upgrade Button */}
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={loadingPlanId === plan.id}
                  className="w-full bg-[#15B8A6] hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  {loadingPlanId === plan.id
                    ? 'Processing...'
                    : plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t">
          <button
            onClick={closeTokenLimitModal}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
