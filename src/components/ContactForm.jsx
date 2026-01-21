'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '../../lib/language-context';
import { getTranslation } from '../../lib/i18n';

export default function ContactForm() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    reset();
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-12">
      {/* Header Section */}
      <div className="text-center pb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-500 mb-4">
          {t('contactForm.title')}
        </h1>
        <p className="text-gray-600 text-lg">{t('contactForm.subtitle')}</p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Contact Information */}
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white overflow-hidden">
            {/* Background decoration circles */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-700 rounded-full opacity-20 -mr-32 -mb-32"></div>
            <div className="absolute bottom-12 right-12 w-48 h-48 bg-slate-600 rounded-full opacity-10"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-3">
                {t('contactForm.contactInformation')}
              </h2>
              <p className="text-slate-300 mb-12">
                {t('contactForm.sayHello')}
              </p>

              {/* Contact Items */}
              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-1 flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm font-medium">
                      {t('contactForm.phone')}
                    </p>
                    <p className="text-white font-semibold">
                      {t('contactForm.phoneNumber')}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-1 flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm font-medium">
                      {t('contactForm.email')}
                    </p>
                    <p className="text-white font-semibold">
                      {t('contactForm.emailAddress')}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-1 flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm font-medium">
                      {t('contactForm.location')}
                    </p>
                    <p className="text-white font-semibold">
                      {t('contactForm.locationAddress')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="flex items-stretch">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-6 flex flex-col"
            >
              {/* First Name and Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contactForm.firstName')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('contactForm.firstNamePlaceholder')}
                    {...register('firstName', {
                      required: t('contactForm.firstNameRequired'),
                    })}
                    className="w-full border-b-2 border-gray-300 bg-transparent focus:border-teal-500 outline-none py-2 transition text-gray-800 placeholder-gray-400"
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contactForm.lastName')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('contactForm.lastNamePlaceholder')}
                    {...register('lastName', {
                      required: t('contactForm.lastNameRequired'),
                    })}
                    className="w-full border-b-2 border-gray-300 bg-transparent focus:border-teal-500 outline-none py-2 transition text-gray-800 placeholder-gray-400"
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contactForm.email')}
                  </label>
                  <input
                    type="email"
                    placeholder={t('contactForm.emailPlaceholder')}
                    {...register('email', {
                      required: t('contactForm.emailRequired'),
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t('contactForm.emailInvalid'),
                      },
                    })}
                    className="w-full border-b-2 border-gray-300 bg-transparent focus:border-teal-500 outline-none py-2 transition text-gray-800 placeholder-gray-400"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contactForm.phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    placeholder={t('contactForm.phonePlaceholder')}
                    {...register('phone', {
                      required: t('contactForm.phoneRequired'),
                    })}
                    className="w-full border-b-2 border-gray-300 bg-transparent focus:border-teal-500 outline-none py-2 transition text-gray-800 placeholder-gray-400"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contactForm.message')}
                </label>
                <textarea
                  rows="5"
                  placeholder={t('contactForm.messagePlaceholder')}
                  {...register('message', {
                    required: t('contactForm.messageRequired'),
                  })}
                  className="w-full border-b-2 border-gray-300 bg-transparent focus:border-teal-500 outline-none py-2 transition resize-none text-gray-800 placeholder-gray-400"
                ></textarea>
                {errors.message && (
                  <span className="text-red-500 text-sm">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4 mt-auto">
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
                >
                  {t('contactForm.sendMessage')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
