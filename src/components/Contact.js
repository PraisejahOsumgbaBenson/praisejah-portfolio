import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./Contact.css";
import { FiArrowRight } from "react-icons/fi";

import Terminal from "./Terminal"; // Add terminal import

/**
 * Contact component - Renders a contact form with submission handling
 * Features include form validation, submission status feedback, and auto-dismissal of status messages
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

  // State to manage submission status messages
  const [status, setStatus] = useState(""); // feedback for user

  /**
   * useEffect hook to automatically dismiss status messages after a delay
   * Only triggers for non-empty status messages that aren't "Sending..."
   * Sets a timer to clear the status after 3000ms (3 seconds)
   * Includes cleanup function to prevent memory leaks by clearing timer on unmount
   */
  useEffect(() => {
    if (status && status !== "Sending...") {
      const timer = setTimeout(() => {
        setStatus("");
      }, 3000); // Message will disappear after 3 seconds

      // Cleanup function to clear the timer if component unmounts
      return () => clearTimeout(timer);
    }
  }, [status]); // Dependency array ensures effect runs when status changes

  /**
   * Handles input changes for all form fields
   * @param {Object} e - The event object from the input change
   * Updates the formData state with the new value while preserving other fields
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * Handles form submission
   * @param {Object} e - The event object from form submission
   * Prevents default form submission behavior
   * Sends form data to FormSubmit API endpoint
   * Updates status throughout the submission process
   * Resets form on successful submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending..."); // Set status to indicate submission in progress

    // Using FormSubmit to send the email directly
    try {
      // FormSubmit endpoint - replace with your email
      const response = await fetch(
        "https://formsubmit.co/ajax/praisejahosumgbabenson@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Check if the response is successful (status code 200-299)
      if (response.ok) {
        setStatus("Message sent successfully"); // Success message
        // Reset form data to empty values
        setFormData({
          name: "",
          subject: "",
          company: "",
          email: "",
          message: "",
        });
      } else {
        setStatus("Something went wrong"); // Error message for non-OK responses
      }
    } catch (err) {
      console.error(err); // Log error for debugging
      setStatus("Failed to send message"); // Error message for network failures
    }
  };

  return (
    <>
    <div className="contact-container">
      <Header />
      <div className="contact-wrapper">
        <div className="contact-content">
          {/* Left section with contact information */}
          <div className="left-section">
            <h1 className="main-title">Let's collaborate</h1>
            <p className="email">praisejahosumgbabenson@gmail.com</p>
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
            <form onSubmit={handleSubmit}>
              {/* Hidden fields for FormSubmit configuration */}
              <input
                type="hidden"
                name="_subject"
                value="New contact form submission!"
              />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              {/* Form row with Name and Subject fields */}
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
                      required
                    />
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

              {/* Form row with Company and Email fields */}
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
                      required
                    />
                    <div className="input-line"></div>
                  </div>
                </div>
              </div>

              {/* Full-width Message textarea */}
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
                    required
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

            {/* Conditional rendering of status message with dynamic className */}
            {status && (
              <p
                className={`status-message ${
                  status === "Message sent successfully"
                    ? "success" // Green background for success
                    : status === "Sending..."
                    ? "sending" // Yellow background for sending state
                    : "error" // Red background for errors
                }`}
              >
                {status}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    <Terminal />
    </>
  );
}

export default Contact;
