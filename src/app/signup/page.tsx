'use client';
import React, { useState } from 'react';
import './Signup.scss';

const Signup = () => {
  const [formValues, setFormValues] = useState({
    parentName: '',
    kidName1: '',
    kidName2: '',
    kidName3: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
  
    try {
      const response = await fetch('https://chess-club-backend.vercel.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });
  
      if (response.ok) {
        // Ensure response is JSON before parsing
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const data = await response.json();
          console.log('Form submitted successfully:', data);
          window.location.href = '/signin';
        } else {
          setErrorMessage('Unexpected response format. Please try again.');
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'An error occurred. Please try again.');
        console.error('Error submitting the form:', errorData);
      }
    } catch (error) {
      console.error('Network error or other issue:', error);
      setErrorMessage('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-form-container">
      <h2>CHESS CLUB: VISITOR SIGN-UP FORM</h2>
      <img src='/images/logo.png' alt="Delaware Chess Champs Logo" className="logo" />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <div className="input-row">
            <div className="input-column">
              <label htmlFor="parentName">Parent Name</label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                placeholder="Name"
                value={formValues.parentName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-column">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="(000) 000-0000"
                pattern="^\(\d{3}\) \d{3}-\d{4}$"
                title="Please enter a valid phone number."
                value={formValues.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={formValues.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="kidName1">Kid-1 Name</label>
          <input
            type="text"
            id="kidName1"
            name="kidName1"
            placeholder="Kid-1 Name"
            value={formValues.kidName1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="kidName2">Kid-2 Name</label>
          <input
            type="text"
            id="kidName2"
            name="kidName2"
            placeholder="Kid-2 Name"
            value={formValues.kidName2}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="kidName3">Kid-3 Name</label>
          <input
            type="text"
            id="kidName3"
            name="kidName3"
            placeholder="Kid-3 Name"
            value={formValues.kidName3}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? <img src="/images/loading.gif" alt="Loading" /> : 'Submit'}
          </button>
          <button
            type="button"
            className="signin-button"
            onClick={() => window.location.href = '/signin'}
          >
            Already have an account? Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
