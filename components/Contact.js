"use client";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Terminal from "./Terminal";
import { FiArrowRight } from "react-icons/fi";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    company: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (status && status !== "Sending...") {
      const timer = setTimeout(() => {
        setStatus("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
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

      if (response.ok) {
        setStatus("Message sent successfully");
        setFormData({
          name: "",
          subject: "",
          company: "",
          email: "",
          message: "",
        });
      } else {
        setStatus("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message");
    }
  };

  return (
    <>
      <div className="contact-container">
        <Header />
        <div className="contact-wrapper">
          <div className="contact-content">
            <div className="left-section">
              <h1 className="main-title">Let&apos;s collaborate</h1>
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

            <div className="right-section">
              <h2 className="form-title">Say hello</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="hidden"
                  name="_subject"
                  value="New contact form submission!"
                />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />

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

                <div className="submit-section">
                  <button type="submit" className="submit-button">
                    <div className="submit-line">
                      <span>Submit here</span>
                      <FiArrowRight className="arrow-icon" />
                    </div>
                  </button>
                </div>
              </form>

              {status && (
                <p
                  className={`status-message ${
                    status === "Message sent successfully"
                      ? "success"
                      : status === "Sending..."
                      ? "sending"
                      : "error"
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
