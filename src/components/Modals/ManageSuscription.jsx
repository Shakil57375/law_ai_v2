import { useState } from "react";
import { useGetUserProfileQuery } from "../../features/auth/authApi";
import WholeWebsiteLoader from "../Loader/WholeWebsiteLoader";
import { format } from "date-fns";
import CustomPricingModal from "./CustomPricingModal.jsx";
import PricingModal from "../PricingModal";

export function SubscriptionManagement() {
  const [autoRenew, setAutoRenew] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isCustomPricingModalOpen, setIsCustomPricingModalOpen] =
    useState(false);
  const { data: userData, isLoading } = useGetUserProfileQuery();
  const openPricingModal = () => {
    if (userData?.account_type === "company") {
      setIsCustomPricingModalOpen(true);
    } else if (userData?.account_type === "individual") {
      setIsPricingModalOpen(true);
    } else {
      setIsPricingModalOpen(true);
    }
  };

  const closePricingModal = () => setIsPricingModalOpen(false);
  const closeCustomPricingModal = () => setIsCustomPricingModalOpen(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <WholeWebsiteLoader />
      </div>
    );
  }

  const timestamp = new Date(userData.subscription_expires_on);
  const expire_date = format(timestamp, "MMMM dd, yyyy HH:mm:ss");

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white p-8">
      <h1 className="text-4xl font-bold mb-12">Manage Subscription</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="p-6 bg-white rounded-lg border-2 border-[#15B8A6] dark:bg-gray-700 dark:border-[#15B8A6]">
          <div className="grid grid-cols-1 gap-6">
            <div className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-600">
              <input
                type="text"
                value={userData.account_type}
                disabled
                className="w-full bg-transparent text-black dark:text-white"
                placeholder="Purchase Date"
              />
            </div>
            <div className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-600">
              <input
                type="text"
                value={expire_date}
                disabled
                className="w-full bg-transparent text-black dark:text-white"
                placeholder="Expiry Date"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <button
              onClick={openPricingModal}
              className="py-4 px-6 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors dark:bg-green-600 dark:hover:bg-green-700"
            >
              Upgrade Subscription
            </button>
            <button className="py-4 px-6 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors dark:bg-red-600 dark:hover:bg-red-700">
              Cancel Subscription
            </button>
          </div>

          {/* Regular pricing modal for company or individual accounts */}
          <PricingModal
            isOpen={isPricingModalOpen}
            onClose={closePricingModal}
          />

          {/* Custom pricing modal for other account types */}
          <CustomPricingModal
            isOpen={isCustomPricingModalOpen}
            onClose={closeCustomPricingModal}
          />
        </div>
      </div>
    </div>
  );
}
