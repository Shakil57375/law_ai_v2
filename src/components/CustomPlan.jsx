import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function CustomPlanModal() {
  const { closeCustomPlanModal } = useAuth();
  const [userCount, setUserCount] = useState(3);
  const pricePerUser = 49;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full relative">
        <button
          onClick={closeCustomPlanModal}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
          Add User
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-black dark:text-white">
              User
            </label>
            <div className="flex items-center border rounded-lg p-2 w-24 bg-gray-100 dark:bg-gray-600">
              <span className="mr-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                type="number"
                value={userCount}
                onChange={(e) => setUserCount(Number.parseInt(e.target.value))}
                className="w-12 outline-none bg-transparent text-black dark:text-white"
                min="1"
              />
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-100 dark:bg-gray-600">
            <div className="text-gray-600 dark:text-gray-400">
              Money payable:
            </div>
            <div className="text-xl font-semibold text-black dark:text-white">
              {userCount} × {pricePerUser} = {userCount * pricePerUser}
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}
