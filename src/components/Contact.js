import React, { useState } from "react";
import Header from "./Header";
import "./Contact.css";
import { FiArrowRight } from "react-icons/fi";

/**
 * Contact Component - Renders a contact form with animated input fields
 * Features interactive form inputs with animated underline effect on focus
 */
function Contact() {
  // State to manage form data with initial empty values
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    company: "",
    email: "",
    message: "",
  });

  /**
   * Handles input changes for all form fields
   * @param {Object} e - The event object from the input change
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update form state while preserving other field values
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="contact-container">
      {/* Header component for navigation */}
      <Header />

      {/* Main content wrapper with glassmorphism effect */}
      <div className="contact-wrapper">
        <div className="contact-content">
          {/* Left section with contact information */}
          <div className="left-section">
            <h1 className="main-title">Let's collaborate</h1>
            <p className="email">praisejahosumgbabenson@gmail.com</p>

            {/* Information blocks container */}
            <div className="info-blocks-container">
              <div className="info-block">
                <h3 className="info-title">Fields</h3>
                <p className="info-content">FB 1/0 SW W</p>
              </div>

              <div className="info-block">
                <h3 className="info-title">Abuja, Nigeria:</h3>
                <p className="info-content">+(234) 902 2725 714</p>
              </div>
            </div>
          </div>

          {/* Right section with contact form */}
          <div className="right-section">
            <h2 className="form-title">Say hello</h2>

            {/* Contact form with animated inputs */}
            <form>
              {/* First row of form inputs */}
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <div className="input-container">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="animated-input"
                      placeholder="Your Name"
                    />
                    {/* Animated line that appears on focus */}
                    <div className="input-line"></div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <div className="input-container">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="animated-input"
                      placeholder="Subject here"
                    />
                    <div className="input-line"></div>
                  </div>
                </div>
              </div>

              {/* Second row of form inputs */}
              <div className="form-row">
                <div className="form-group">
                  <label>Company</label>
                  <div className="input-container">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="animated-input"
                      placeholder="Company name"
                    />
                    <div className="input-line"></div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <div className="input-container">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="animated-input"
                      placeholder="your@email.com"
                    />
                    <div className="input-line"></div>
                  </div>
                </div>
              </div>

              {/* Message textarea (full width) */}
              <div className="form-group full-width">
                <label>Message</label>
                <div className="input-container">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="animated-input textarea"
                    placeholder="Start typing here"
                    rows="3"
                  ></textarea>
                  <div className="input-line"></div>
                </div>
              </div>

              {/* Submit button section */}
              <div className="submit-section">
                <button type="submit" className="submit-button">
                  <div className="submit-line">
                    <span>Submit here</span>
                    <FiArrowRight className="arrow-icon" />
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
