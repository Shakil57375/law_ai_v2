import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const ModalForFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const onClose = () => {
    const from = location.state?.from?.pathname || "/";
    navigate(-1);
  };

  const faqs = [
    {
      question: "Is Clin Technologies HIPAA compliant?",
      answer: `
      Yes, all of our AI-powered solutions are fully HIPAA compliant. We follow a security-first architecture with comprehensive encryption (at rest and in transit), zero-trust principles, and role-based access controls to protect patient data. We also offer Business Associate Agreements (BAAs) for added assurance.
    `,
    },
    {
      question:
        "Can I integrate Clin Technologies with my existing EMR system?",
      answer: `
      Absolutely. Our AI platform is built with seamless EMR integration in mind. Once set up, the AI-generated documentation is automatically formatted to match your system's requirements, streamlining your workflow and minimizing manual entry.
    `,
    },
    {
      question: "How does the AI personalize my documentation process?",
      answer: `
      Our system includes a Learning Mode that adapts to your specific workflow and preferences over time. The AI refines its understanding based on your feedback, ensuring highly accurate and customized output tailored to your specialty and charting habits.
    `,
    },
    {
      question: "What if the AI-generated documentation isn't accurate?",
      answer: `
      You can always review and adjust the output. If something doesn’t align with your expectations, simply provide feedback through the system. Our AI learns continuously to improve accuracy and precision over time. 
      <br /><br />
      For example: 
      <ul class="list-disc pl-6">
        <li>“The SOAP note was too generic. Please include more detail about the patient's symptoms and clinical reasoning.”</li>
        <li>“This chart includes terms we don’t use in our clinic. Please adjust the language to match our documentation style.”</li>
      </ul>
    `,
    },
    {
      question: "What solutions does Clin Technologies offer?",
      answer: `
      We offer a suite of AI-powered tools to enhance every part of your clinical documentation:
      <ul class="list-disc pl-6">
        <li><strong>TranscriptX:</strong> Accurate medical transcriptions of clinical encounters.</li>
        <li><strong>Chartwright:</strong> Converts raw input into fully formatted charts with customization.</li>
        <li><strong>Redactify:</strong> Redacts patient identifiers to support compliance and data protection.</li>
        <li><strong>Validify:</strong> Reviews charts for coding accuracy, documentation gaps, and regulatory compliance.</li>
      </ul>
    `,
    },
    {
      question: "Who can use Clin Technologies?",
      answer: `
      Clin Technologies is ideal for healthcare professionals across all specialties — from solo practitioners and primary care providers to large clinics, hospitals, and behavioral health practices. If you document patient care, Clin can help.
    `,
    },
    {
      question: "Do you offer a free trial?",
      answer: `
      Yes! We encourage healthcare providers to try Clin Technologies for FREE to experience how our AI transforms clinical documentation. Just click “Signup” on our website to get started.
    `,
    },
    {
      question: "I have another question. How can I contact support?",
      answer: `
      We're happy to help! Please reach out through our support page or email us directly at <strong>support@clintechso.com</strong>. Our team is ready to assist with setup, customization, or general inquiries.
    `,
    },
  ];
  return (
    <div>
      {/* Modal */}
      <div>
        <h2 className="text-xl font-semibold mb-6 text-center">FAQ</h2>

        <div className="space-y-4 max-w-3xl mx-auto dark:text-white h-[calc(100vh-175px)] overflow-y-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-black dark:border-white rounded-lg p-8 transition-shadow duration-300 hover:shadow-lg dark:text-white"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <span className="text-2xl text-gray-500 dark:text-white">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "h-full" : "max-h-0"
                }`}
              >
                <p
                  className="mt-4 text-sm md:text-base text-gray-600 whitespace-pre-line dark:text-white"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
