import React from 'react';
import { Navbar } from '../pages/Home/Navbar';
import Footer from './Footer';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <div className="w-full bg-white">
      <Navbar />
      {/* Add padding-top to account for fixed navbar */}
      <main className="w-full pt-16">
        <ContactForm />
      </main>
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default Contact;
