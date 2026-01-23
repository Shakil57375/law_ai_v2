import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useResetPasswordMutation } from '../../features/api/apiSlice';
import { useLanguage } from '../../../lib/language-context';
import { getTranslation } from '../../../lib/i18n';
import logo from "../../assets/logo.png";
export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const authData = JSON.parse(localStorage.getItem('email'));
  const email = authData?.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('newPassword');

  const onSubmit = async (data) => {
    if (!email) {
      toast.error(t('toast.emailMissing'), {
        duration: 2000,
      });
      navigate('/forgotPassword');
      return;
    }

    const storedOtp = localStorage.getItem('otp');
    if (!storedOtp) {
      toast.error(t('toast.otpRequired'), { duration: 2000 });
      navigate('/verificationCode');
      return;
    }

    try {
      await resetPassword({
        email,
        otp: storedOtp,
        new_password: data.newPassword,
      }).unwrap();

      toast.success(t('toast.passwordReset'), {
        duration: 2000,
      });

      setTimeout(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('otp');
        navigate('/login');
      }, 1500);
    } catch (err) {
      const errorMsg = err?.data?.error?.[0] || t('toast.passwordReset');
      toast.error(errorMsg);
    }
  };

  if (!email) {
    navigate('/forgotPassword');
    return null;
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 dark:text-[#161C2D] text-[#161C2D]">
      <div className="hidden lg:flex items-center justify-center bg-gray-900 p-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FFD700' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <Link
          to={'/home'}
          className="relative z-10 text-center text-white max-w-md flex items-center flex-col"
        >
          <img src={logo} alt="Logo" className="w-24 h-24 mb-4" />
          <h1 className="text-4xl font-bold mb-4">Your Trusted AI</h1>
          <h1 className="text-4xl font-bold">Legal Companion.</h1>
        </Link>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your new password
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter New Password"
                    {...register('newPassword', {
                      required: 'New password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#15B8A6] focus:border-[#15B8A6] sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm New Password"
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === password || 'Passwords do not match',
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#15B8A6] focus:border-[#15B8A6] sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#15B8A6] hover:bg-[#089181] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#15B8A6] disabled:opacity-50"
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
