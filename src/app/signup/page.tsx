'use client';
import React, { useState } from 'react';
import './Signup.scss'; // Import the SCSS file

const Signup = () => {
  // State to manage form input values
  const [formValues, setFormValues] = useState({
    parentFirstName: '',
    parentLastName: '',
    kidFirstName: '',
    kidLastName: '',
    email: '',
    phone: ''
  });

  // Handler to update form values
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  // Handler for form submission
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('https://chess-club-backend.vercel.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });

      if (!response.ok) {
        window.location.href = '/signin';
        // Handle error if the request failed
        console.error('Error:', response.statusText);
        return;
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="signup-form-container">
      <img src='/images/logo.png' alt="Delaware Chess Champs Logo" className="logo" />
      <h2>CHESS CLUB: VISITOR SIGN-UP FORM</h2>
      <p>
        For compliance and emergency communication purposes, Delaware Chess Champs requires basic information from all patrons visiting our chess club. Your data will be handled confidentially and used solely for these purposes.
      </p>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Parent Name</label>
          <div className="input-row">
            <input
              type="text"
              name="parentFirstName"
              placeholder="First Name"
              value={formValues.parentFirstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="parentLastName"
              placeholder="Last Name"
              value={formValues.parentLastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Kid Name</label>
          <div className="input-row">
            <input
              type="text"
              name="kidFirstName"
              placeholder="First Name"
              value={formValues.kidFirstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="kidLastName"
              placeholder="Last Name"
              value={formValues.kidLastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
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
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="(000) 000-0000"
            pattern="^\(\d{3}\) \d{3}-\d{4}$"
            title="Please enter a valid phone number."
            value={formValues.phone}
            onChange={handleInputChange}
            required
          />
          <small>Please enter a valid phone number.</small>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
