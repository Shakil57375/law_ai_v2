import { useState, useRef, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { Toaster } from 'react-hot-toast';
import ModalForForgotPassword from './components/Modals/ForgetPasswordModal';
import ModalForVerificationCode from './components/Modals/VerificationCodeModal';
import ModalForResetPassword from './components/Modals/ModalForResetPassword';
import ModalTermsAndCondition from './components/Modals/TermsAndCondtionModal';
import ProfileModal from './components/Modals/ModalForProfileEdit';
import { ModalForHelpAndSupport } from './components/Modals/HelpAndSupport';
import { ModalForSettings } from './components/Modals/SettingModal';
import { ModalForFAQ } from './components/Modals/FaqModal';
import { UpgradeModal } from './components/UpgradeModal';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import ModalForSignUp from './pages/SingUpPage';
import Home from './pages/Home/Home';
import { PublicRoute } from './components/PublicRoute';
import NotFoundPage from './pages/NotFoundPage';
import { Header } from './components/Header';
import Users from './pages/Users';
import { PricingModal } from './components/Modals/PricingModal';
import { SubscriptionManagement } from './components/Modals/ManageSuscription';
import { GlobalModals } from './components/Modals/GlobalModal';
import LoginPage from './pages/LoginPage';
import ModalForPrivacyAndPolicy from './components/Modals/PrivacyAndPolicyModal';
import { CustomPlanModal } from './components/CustomPlan';
import VerifyAccount from './pages/VerifyAccount';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Contact from './components/Contact';

const DEFAULT_SIDEBAR_WIDTH = 350;
const MIN_SIDEBAR_WIDTH = 350;
const MAX_SIDEBAR_WIDTH = 500;

function MainContent() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem('sidebarWidth');
    return saved ? Number.parseInt(saved) : DEFAULT_SIDEBAR_WIDTH;
  });
  const [isResizing, setIsResizing] = useState(false);

  const sidebarRef = useRef(null);
  const isResizingRef = useRef(false);

  const closeBothSidebars = () => {
    setIsSidebarOpen(false);
  };

  const handleResizeStart = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      isResizingRef.current = true;
      setIsResizing(true);

      const startX = e.clientX;
      const startWidth = sidebarWidth;

      const handleMouseMove = (moveEvent) => {
        if (!isResizingRef.current) return;

        const delta = moveEvent.clientX - startX;
        const newWidth = Math.min(
          Math.max(startWidth + delta, MIN_SIDEBAR_WIDTH),
          MAX_SIDEBAR_WIDTH
        );

        setSidebarWidth(newWidth);
      };

      const handleMouseUp = () => {
        isResizingRef.current = false;
        setIsResizing(false);
        localStorage.setItem('sidebarWidth', sidebarWidth.toString());
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [sidebarWidth]
  );

  const routesWithHeaderAndSidebar = [
    '/',
    '/chat/:id',
    '/create-class/:id',
    '/custom-plan',
    '/chat-editor/:id',
    '/users',
    '/editProfile',
    '/helpAndSupport',
    '/settings',
    '/terms',
    '/faq',
    '/saved-chats',
    '/upgrade',
    '/manageSubscription',
    '/TermsAndConditions',
    '/aboutMe',
    '/login-info',
    '/privacy',
    '/privacyAndPolicy',
  ];

  const showHeaderAndSidebar = routesWithHeaderAndSidebar.some((route) => {
    const match = new RegExp('^' + route.replace(':id', '[^/]+') + '$');
    return match.test(location.pathname);
  });

  return (
    <div className="flex h-screen overflow-hidden font-montserrat">
      {/* Sidebar */}
      {showHeaderAndSidebar && (
        <>
          {/* Desktop Sidebar - Resizable */}
          <div
            ref={sidebarRef}
            className="hidden lg:block relative flex-shrink-0 transition-all duration-300"
            style={{
              width: isSidebarOpen ? `${sidebarWidth}px` : '0px',
              overflow: 'hidden',
            }}
          >
            <div className="h-full" style={{ width: `${sidebarWidth}px` }}>
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                closeBothSidebars={closeBothSidebars}
              />
            </div>

            {/* Resize Handle - Desktop only */}
            {isSidebarOpen && (
              <div
                onMouseDown={handleResizeStart}
                className={`absolute right-0 top-0 h-full w-1 bg-transparent hover:bg-teal-500 transition-colors cursor-col-resize z-50 ${
                  isResizing ? 'bg-teal-500' : ''
                }`}
                style={{
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-gray-300 dark:bg-gray-600 rounded-full" />
              </div>
            )}
          </div>

          {/* Mobile Sidebar - Overlay */}
          <div className="lg:hidden">
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              closeBothSidebars={closeBothSidebars}
            />
          </div>
        </>
      )}

      {/* Main Content Area - Expands when sidebar closes */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white dark:bg-gray-800">
        {showHeaderAndSidebar && (
          <Header
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        )}

        <div
          className={`flex-1 ${
            location.pathname === '/home' || location.pathname === '/contact'
              ? 'overflow-y-auto'
              : 'overflow-hidden'
          }`}
        >
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ChatArea />
                </PrivateRoute>
              }
            />
            <Route path="/home" element={<Home />} />
            <Route
              path="/chat/:id"
              element={
                <PrivateRoute>
                  <ChatArea />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path="/editProfile"
              element={
                <PrivateRoute>
                  <ProfileModal />
                </PrivateRoute>
              }
            />
            <Route
              path="/signUp"
              element={
                <PublicRoute>
                  <ModalForSignUp />
                </PublicRoute>
              }
            />
            <Route
              path="/verifyAccount"
              element={
                <PublicRoute>
                  <VerifyAccount />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/forgetPassword"
              element={
                <PublicRoute>
                  <ModalForForgotPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/verificationCode"
              element={
                <PublicRoute>
                  <ModalForVerificationCode />
                </PublicRoute>
              }
            />
            <Route
              path="/resetPass"
              element={
                <PublicRoute>
                  <ModalForResetPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/helpAndSupport"
              element={<ModalForHelpAndSupport />}
            />
            <Route path="/settings" element={<ModalForSettings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<ModalForFAQ />} />
            <Route
              path="/upgrade"
              element={
                <PrivateRoute>
                  <UpgradeModal />
                </PrivateRoute>
              }
            />
            <Route
              path="/manageSubscription"
              element={
                <PrivateRoute>
                  <SubscriptionManagement />
                </PrivateRoute>
              }
            />

            <Route
              path="/TermsAndConditions"
              element={<ModalTermsAndCondition />}
            />
            <Route path="/terms" element={<ModalTermsAndCondition />} />
            <Route path="/privacy" element={<ModalForPrivacyAndPolicy />} />
            <Route
              path="/pricing"
              element={
                <PublicRoute>
                  <PricingModal />
                </PublicRoute>
              }
            />
            <Route path="/custom-plan" element={<CustomPlanModal />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <ChatProvider>
            <div className="font-montserrat">
              <GlobalModals />
              <MainContent />
            </div>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  fontSize: '14px',
                },
              }}
            />
          </ChatProvider>
        </AuthProvider>
      </I18nextProvider>
    </Router>
  );
}

export default App;
