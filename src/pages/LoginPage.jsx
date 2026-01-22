import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/api/apiSlice';
import googleIcon from '../assets/google-login.png';
import toast from 'react-hot-toast';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import app from '../Firebase/firebase';
const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState('');
  const auth = getAuth(app);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (credentials) => {
    try {
      const response = await login({
        email: credentials.email,
        password: credentials.password,
      }).unwrap();

      dispatch(
        userLoggedIn({
          user: response.data.email || credentials.email,
          token: response.data.access_token,
          refreshToken: response.data.refresh_token,
        })
      );

      toast.success('Login successful!', { duration: 2000 });

      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      const errorMsg = err?.data?.error || 'Login failed. Please try again.';
      toast.error(errorMsg);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setError('');
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      if (user) {
        console.log('hlw');
        toast.success(`Welcome ${user.displayName}`, { duration: 2000 });
      }
      const idToken = await user.getIdToken();

      // Send token to backend
      const response = await fetch(
        `https://backend.gameplanai.co.uk/authentication_app/social_signup_signin/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: user.displayName,
            email: user.email,
            token: idToken,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Google Login successful, backend response:', data);

        dispatch(
          userLoggedIn({
            user: data.user_profile,
            token: data.access,
          })
        );

        localStorage.setItem('auth', JSON.stringify(data));
      } else {
        throw new Error('Backend login failed.');
      }
    } catch (error) {
      console.error('Google Login Error:', error);
      setError('Failed to login with Google. Please try again.');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 dark:text-[#161C2D] text-[#161C2D]">
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
            <h2 className="text-3xl font-bold text-gray-900">
              Hello, Welcome!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please Enter Your Details Below To Continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#15B8A6] focus:border-[#15B8A6] sm:text-sm mt-1"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter Password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#15B8A6] focus:border-[#15B8A6] sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPass ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link
                  to="/forgetPassword"
                  className="text-sm font-medium text-[#15B8A6] hover:text-[#15B8A6]"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#15B8A6] hover:bg-[#0b8576] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#15B8A6] disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Create account,{' '}
                <Link
                  to="/signUp"
                  className="font-medium text-[#15B8A6] hover:text-[#15B8A6]"
                >
                  sign up
                </Link>
              </p>
            </div>
          </form>
          <div className="pt-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
            or
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleGoogleLogin}
              className="flex p-4 border rounded-l-full rounded-r-full items-center hover:bg-gray-200 transition-colors duration-300 hover:text-[#15B8A6]"
            >
              <img
                src={googleIcon}
                alt="Google Login"
                className="w-6 h-6 mr-2"
              />
              <span>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
