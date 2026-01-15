import { useAuth } from '../../context/AuthContext';
import { CustomPlanModal } from '../CustomPlan';
import { PricingModal } from './PricingModal';
import { TokenLimitModal } from './TokenLimitModal';

export function GlobalModals() {
  const { showPricingModal, showCustomPlanModal, showTokenLimitModal } =
    useAuth();

  return (
    <>
      {showPricingModal && <PricingModal />}
      {showCustomPlanModal && <CustomPlanModal />}
      {showTokenLimitModal && <TokenLimitModal />}
    </>
  );
}
