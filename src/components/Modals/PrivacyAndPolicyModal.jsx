import React, { useState } from "react";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form
import { motion } from "framer-motion"; // For transition animations
import { IoMdClose } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ModalForPrivacyAndPolicy = () => {
  const navigate = useNavigate(); // Used for redirection after closing the modal

  // Close modal and navigate back
  const closeModal = () => {
    navigate(-1)
  };

  return (
    <div
      className="p-6 lg:px-20 w-full mx-auto"
    >
      {/* Backdrop with blur effect */}

      {/* Modal */}
      <div
        
      >

        <div>
          <h1 className="text-xl text-center font-bold text-[#232323] dark:bg-gray-700 dark:text-white">
            Privacy policy
          </h1>
        </div>

        {/* Terms and Condition Sections */}

        <p className="text-sm font-montserrat text-start font-medium leading-8 mt-7 px-2 lg:px-4">
        At Gameplan (“we,” “us,” or “our”), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, and share your data when you use our mobile application, website, and related services (collectively, the “Platform”). We collect personal data such as your name, email address, payment details, and usage information to provide and improve our services, as described in this policy. We may share your information with third-party service providers for purposes such as payment processing, analytics, and customer support, and we ensure that they comply with applicable privacy laws. Your data is processed in accordance with global data protection regulations, including the <strong>General Data Protection Regulation (GDPR)</strong> and the <strong>California Consumer Privacy Act (CCPA)</strong>, and you have rights to access, correct, delete, or restrict your data. We use industry-standard measures to protect your data but cannot guarantee absolute security. By using the Platform, you consent to the collection and processing of your information as outlined in this policy. If you are under the age of 18, you may only use the Platform with parental consent. This Privacy Policy may be updated periodically, and significant changes will be communicated through the Platform or via email. For questions or to exercise your rights, contact us at support@gameplanai.co.uk 
        </p>
      </div>
    </div>
  );
};

export default ModalForPrivacyAndPolicy;
