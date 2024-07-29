'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './Signin.scss'; // Import the SCSS file
// import loadingGif from './loading.gif'; // Import your loading GIF

const SignIn = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    acceptTerms: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const router = useRouter();

  const handleInputChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!formValues.acceptTerms) {
      setError('You must accept the terms and conditions to sign in.');
      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      const response = await fetch('https://chess-club-backend.vercel.app/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formValues.email }),
      });

      setIsLoading(false); // Set loading state to false

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          router.push('/ThankYouMessage');
        } else {
          setError('Sign in failed. Please try again.');
        }
      } else {
        setError('Error signing in. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setIsLoading(false); // Set loading state to false on error
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signin-form-container">
      {isLoading ? (
        <div className="loading-container">
          <img src='/images/loading.gif' alt="Loading..." className="loading-gif" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="signin-form">
          <h2>Sign In</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@example.com"
              value={formValues.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formValues.acceptTerms}
              onChange={handleInputChange}
            />
            <label>
              I accept the{' '}
              <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                terms and conditions
              </a>
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="form-actions">
            <button type="submit" className="signin-button">Sign In</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignIn;
