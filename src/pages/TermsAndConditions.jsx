import React from 'react';
import { Navbar } from './Home/Navbar';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white mt-20 mb-10 rounded shadow">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="mb-4">
          These are the terms and conditions for using our service.
        </p>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white mt-20 mb-10 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using our service, you accept and agree to be bound
          by the terms and provision of this agreement.
        </p>

        <h2 className="text-2xl font-bold mb-4">2. Privacy Policy</h2>
        <p className="mb-4">
          Our privacy policy outlines how we collect, use, and protect your
          personal information.
        </p>

        <h2 className="text-2xl font-bold mb-4">3. Intellectual Property</h2>
        <p className="mb-4">
          All intellectual property rights in our service are owned by us or our
          licensors.
        </p>

        <h2 className="text-2xl font-bold mb-4">4. Limitation of Liability</h2>
        <p className="mb-4">
          We are not liable for any damages or losses resulting from your use of
          our service.
        </p>

        <h2 className="text-2xl font-bold mb-4">5. Termination of Agreement</h2>
        <p className="mb-4">
          We reserve the right to terminate this agreement at any time.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
