import { X } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

export function PricingModal() {
  const { closePricingModal, openCustomPlanModal } = useAuth()

  const handleCustomPlan = () => {
    closePricingModal()
    openCustomPlanModal()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-5xl w-full relative">
        <button onClick={closePricingModal} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {/* Professional Plan */}
          <div className="border rounded-lg p-6 dark:bg-gray-700">
            <div className="text-lg mb-2 text-black dark:text-white">Professional</div>
            <div className="flex items-baseline mb-4">
              <span className="text-2xl dark:text-white text-black">$</span>
              <span className="text-4xl font-bold dark:text-white text-black">56</span>
            </div>
            <p className="text-gray-600 mb-4 dark:text-gray-400">For individual Person</p>
            <button className="w-full bg-[#15B8A6] text-white rounded-lg py-3 mb-6 hover:bg-blue-700 transition-colors">
              Buy now
            </button>
            <ul className="space-y-3 text-black dark:text-white">
              <li className="flex items-center">
                <CheckIcon />
                <span className="ml-2">Single user license</span>
              </li>
              <li className="flex items-center">
                <CheckIcon />
                <span className="ml-2">Lifetime updates</span>
              </li>
              <li className="flex items-center">
                <CheckIcon />
                <span className="ml-2">Secure, HIPAA-compliant data Storage</span>
              </li>
            </ul>
          </div>

          {/* Team Plan */}
          <div className="border-2 border-[#15B8A6] rounded-lg p-6 relative dark:bg-gray-700">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#15B8A6] text-white px-4 py-1 rounded-full text-sm">
              Best value
            </div>
            <div className="text-lg mb-2 text-black dark:text-white">Team</div>
            <div className="flex items-baseline mb-4">
              <span className="text-2xl dark:text-white text-black">$</span>
              <span className="text-4xl font-bold dark:text-white text-black">588</span>
            </div>
            <p className="text-gray-600 mb-4 dark:text-gray-400">For fast-growing teams, up to 12 library users.</p>
            <button className="w-full bg-[#15B8A6] text-white rounded-lg py-3 mb-6 hover:bg-blue-700 transition-colors">
              Buy now
            </button>
            <ul className="space-y-3 text-black dark:text-white">
              <li className="flex items-center">
                <CheckIcon />
                <span className="ml-2">Up to 12 users license</span>
              </li>
              <li className="flex items-center">
                <CheckIcon />
                <span className="ml-2">Lifetime updates</span>
              </li>
              <li className="flex items-center">
                <CheckIcon />
                <span className="ml-2">Secure, HIPAA-compliant data Storage</span>
              </li>
            </ul>
          </div>

          {/* Custom Plan */}
          <div className="border rounded-lg p-6 dark:bg-gray-700">
            <div className="text-lg mb-2 text-black dark:text-white">Custom Plan</div>
            <p className="text-gray-600 mb-4 dark:text-gray-400">For large teams, an unlimited number of library users.</p>
            <button onClick={handleCustomPlan} className="w-full bg-[#15B8A6] text-white rounded-lg py-3 mb-6 hover:bg-blue-700 transition-colors">
              Buy now
            </button>
            <ul className="space-y-3 text-black dark:text-white">
              <li className="flex items-center">
                <CheckIcon />
                <span className="ml-2">Unlimited library users</span>
              </li>
              <li className="flex items-center">
                <CheckIcon />
                <span className="ml-2">Lifetime updates</span>
              </li>
              <li className="flex items-center">
                <CheckIcon />
                <span className="ml-2">Secure, HIPAA-compliant data Storage</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-[#15B8A6]" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}
