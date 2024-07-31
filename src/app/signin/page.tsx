// SignIn.jsx (or your appropriate file name)
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './Signin.scss';

const SignIn = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    acceptTerms: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);

    try {
      const response = await fetch('https://chess-club-backend.vercel.app/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formValues.email }),
      });

      setIsLoading(false);

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          router.push('/ThankYouMessage');
        } else {
          setError('Email not registered. Please sign up.');
        }
      } else {
        setError('Email not registered. Please sign up.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setIsLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signin-form-container">
      {isLoading ? (
        <div className="loading-container">
          <img src="/images/loading.gif" alt="Loading..." className="loading-gif" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="signin-form">
      <h2>CHESS CLUB: VISITOR SIGN-IN FORM</h2>
      <p>
        For compliance and emergency communication purposes, Delaware Chess Champs requires basic information from all patrons visiting our chess club. Your data will be handled confidentially and used solely for these purposes.
      </p>
      <div className="logo-container">
            <img src="/images/logo.png" alt="Logo" className="logo" />
          </div>
          <div className="form-group1">
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
            <div className="checkbox-container">
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
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-actions">
            <button type="submit" className="signin-button">Sign In</button>
          </div>
          <p className="signup-prompt">
            Don’t you have an account yet? <a href="/signup">Sign Up</a>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignIn;
