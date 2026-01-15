/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useDispatch } from 'react-redux';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // RTK Query hooks

  // Local state for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('auth')
  );
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showCustomPlanModal, setShowCustomPlanModal] = useState(false);
  const [showTokenLimitModal, setShowTokenLimitModal] = useState(false);

  const openPricingModal = () => setShowPricingModal(true);
  const closePricingModal = () => setShowPricingModal(false);
  const openCustomPlanModal = () => setShowCustomPlanModal(true);
  const closeCustomPlanModal = () => setShowCustomPlanModal(false);
  const openTokenLimitModal = () => setShowTokenLimitModal(true);
  const closeTokenLimitModal = () => setShowTokenLimitModal(false);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    toast.success('Logged out successfully.', { duration: 1000 });
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogout,
        showPricingModal,
        showCustomPlanModal,
        showTokenLimitModal,
        openPricingModal,
        openCustomPlanModal,
        openTokenLimitModal,
        closePricingModal,
        closeCustomPlanModal,
        closeTokenLimitModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
