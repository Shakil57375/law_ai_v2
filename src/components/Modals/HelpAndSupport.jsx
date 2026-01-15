import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useHelpSupportMutation } from '../../features/auth/authApi';

export const ModalForHelpAndSupport = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [helpSupport, { isLoading }] = useHelpSupportMutation();

  const onSubmit = async (data) => {
    try {
      await helpSupport({
        email: data.email,
        description: data.description,
      }).unwrap();
      toast.success('Support request sent!');
      reset();
      navigate(-1);
    } catch (error) {
      toast.error('Failed to send support request');
    }
  };

  return (
    <div className="px-4 lg:px-20 mt-4">
      <h2 className="text-xl font-semibold mb-6">Help & Support</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Your Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register('description', {
              required: 'Description is required',
            })}
            rows={4}
            className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white"
            placeholder="Describe your issue"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-2 bg-blue-600 text-white rounded-md font-medium"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};
