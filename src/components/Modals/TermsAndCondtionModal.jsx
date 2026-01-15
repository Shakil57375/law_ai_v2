import React, { useState } from "react";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form
import { motion } from "framer-motion"; // For transition animations
import { IoMdClose } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ModalTermsAndCondition = () => {
  const navigate = useNavigate(); // Used for redirection after closing the modal

  // const { data } = useTermsAndConditionsQuery();

  return (
    <div className="p-6 lg:px-20 w-full mx-auto">
      <div>
        <div>
          <h1 className="text-xl text-center font-bold text-[#232323] dark:bg-gray-700 dark:text-white ">
            Terms And Conditions
          </h1>
        </div>

        {/* Terms and Condition Sections */}

        <p className="text-sm font-montserrat text-start font-medium leading-8 mt-7 px-2 lg:px-4 dark:bg-gray-700 dark:text-white h-[calc(100vh-275px)] overflow-y-auto">
          {/* {data?.description} */}
          hlw
        </p>
      </div>
    </div>
  );
};

export default ModalTermsAndCondition;
