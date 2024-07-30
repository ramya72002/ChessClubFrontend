'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './ThankYouMessage.scss';

const ThankYouMessage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, [router]);

  return (
    <div className="thank-you-container">
      <img src="/images/thank1.png" alt="Thank You Icon" className="thank-you-icon" />
      <h1>Your submission has been received.</h1>
    </div>
  );
};

export default ThankYouMessage;
