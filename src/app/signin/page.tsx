'use client';
import React, { useState } from 'react';
import './Signin.scss'; // Import the SCSS file

const SignIn = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    acceptTerms: false
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!formValues.acceptTerms) {
      setError('You must accept the terms and conditions to sign in.');
      return;
    }

    try {
      const response = await fetch('https://chess-club-backend.vercel.app/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formValues.email })
      });

      if (response.ok) {
        // Redirect or handle successful sign-in
        console.log('Sign in successful');
      } else {
        // Handle error
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="signin-form-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
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
    </div>
  );
};

export default SignIn;
