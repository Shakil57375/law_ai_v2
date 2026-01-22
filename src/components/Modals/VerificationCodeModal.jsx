import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import {
  useSendOtpMutation,
  useVerifyEmailMutation,
} from '../../features/api/apiSlice';
import { useLanguage } from '../../../lib/language-context';
import { getTranslation } from '../../../lib/i18n';

export default function VerificationPage() {
  const [code, setCode] = useState(new Array(4).fill(''));
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [sendOtp, { isLoading: isResending }] = useSendOtpMutation();

  // Get email from localStorage
  const authData = JSON.parse(localStorage.getItem('email'));
  const email = authData?.email;

  const maskEmail = (email) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    const maskedUsername =
      username.slice(0, 3) + '*'.repeat(username.length - 3);
    return `${maskedUsername}@${domain}`;
  };

  const handleInputChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, '');
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < code.length - 1) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace') {
      const newCode = [...code];
      if (code[index] === '' && index > 0) {
        document.getElementById(`code-${index - 1}`).focus();
      } else {
        newCode[index] = '';
        setCode(newCode);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    const newCode = [...code];

    pastedData.split('').forEach((char, i) => {
      if (i < newCode.length) {
        newCode[i] = char;
      }
    });

    setCode(newCode);
    const lastFilledIndex = pastedData.length - 1;
    if (lastFilledIndex >= 0 && lastFilledIndex < newCode.length) {
      document.getElementById(`code-${lastFilledIndex}`).focus();
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const otp = code.join('');

    if (otp.length !== 4) {
      toast.error(t('toast.invalidOTP'));
      return;
    }

    try {
      localStorage.setItem('otp', otp);
      toast.success(t('toast.otpVerified'), { duration: 2000 });

      setTimeout(() => {
        navigate('/resetPass');
      }, 1500);
    } catch (err) {
      const errorMsg = err?.data?.error?.[0] || t('toast.invalidOTP');
      toast.error(errorMsg);
    }
  };

  const handleResendOtp = async () => {
    try {
      await sendOtp({ email }).unwrap();
      toast.success(t('toast.otpResent'), {
        duration: 2000,
      });
    } catch (err) {
      const errorMsg = err?.data?.error?.[0] || t('toast.otpResent');
      toast.error(errorMsg);
    }
  };

  if (!email) {
    navigate('/forgotPassword');
    return null;
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 dark:text-black text-black">
      <div className="hidden lg:flex items-center justify-center bg-gray-900 p-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FFD700' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 text-center text-white max-w-md">
          <div className="text-6xl font-bold mb-4">⚖️</div>
          <h1 className="text-4xl font-bold mb-4">Your Trusted AI</h1>
          <h1 className="text-4xl font-bold">Legal Companion.</h1>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter the 4-digit code sent to{' '}
              <strong>{maskEmail(email)}</strong> to reset your password
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            <div onPaste={handlePaste} className="flex justify-center gap-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleInputChange(e.target, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  maxLength={1}
                  className="w-16 h-16 text-center text-2xl font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15B8A6] bg-gray-100 !text-black"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#15B8A6] hover:bg-[#089181] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#15B8A6] disabled:opacity-50"
            >
              {isVerifying ? 'Verifying...' : 'Submit'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn&apos;t receive the code?{' '}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="font-medium text-[#15B8A6] hover:text-[#15B8A6] disabled:opacity-50"
                >
                  {isResending ? 'Resending...' : 'Resend OTP'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
