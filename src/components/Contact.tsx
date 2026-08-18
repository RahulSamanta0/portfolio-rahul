"use client";

import { useState, useRef } from "react";

const socials = [
  {
    href: "https://github.com/RahulSamanta0",
    iconClass: "ri-github-fill",
    label: "GitHub",
    color: "#6e5494"
  },
  {
    href: "https://www.linkedin.com/in/rahul-samanta-665910255/",
    iconClass: "ri-linkedin-box-fill",
    label: "LinkedIn",
    color: "#0a66c2"
  },
  {
    href: "https://www.instagram.com/iits_raahul/",
    iconClass: "ri-instagram-line",
    label: "Instagram",
    color: "#e1306c"
  },
  {
    href: "https://www.facebook.com/profile.php?id=100049277852999",
    iconClass: "ri-facebook-box-fill",
    label: "Facebook",
    color: "#1877f2"
  }
];

export default function Contact() {
  const [statusMsg, setStatusMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch("https://formspree.io/f/mldnnrkj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMsg("Message delivered successfully!");
        form.reset();
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      } else {
        setStatusMsg("❌ Delivery failed. Please retry.");
      }
    } catch (error) {
      setStatusMsg("⚠ Connection error. Please retry.");
      console.error(error);
    }
  };

  return (
    <section className="contact section" id="contact">
      <div className="contact__overlay"></div>

      <div className="contact__content container">

        {/* Modern Clean Section Header */}
        <div className="contact-header">
          <h2 className="section__title contact-title">
            Let&apos;s Connect_
          </h2>
          <p className="contact-subtitle">
            Have a project in mind or want to collaborate? Drop me a message below.
          </p>
        </div>

        {/* Unified Premium Glass Dashboard Card */}
        <div className="contact-dashboard-wrapper">
          <div className="contact-main-card">

            {/* Left Column: Bio Connect details */}
            <div className="contact-details-side">
              <div className="details-header">
                <span className="details-badge">DIRECT CHANNELS</span>
                <h3 className="details-heading">Contact Info</h3>
              </div>

              <div className="details-list">
                {/* Email Item */}
                <div className="detail-item">
                  <div className="detail-icon">
                    <i className="ri-mail-line" aria-hidden="true"></i>
                  </div>
                  <div className="detail-info">
                    <span className="detail-label">EMAIL ME AT</span>
                    <a href="mailto:rahulsamantaofficial00@gmail.com" className="detail-link">
                      rahulsamantaofficial00@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div className="detail-item">
                  <div className="detail-icon">
                    <i className="ri-map-pin-line" aria-hidden="true"></i>
                  </div>
                  <div className="detail-info">
                    <span className="detail-label">CURRENT LOCATION</span>
                    <span className="detail-value">Baranagar, Kolkata, India</span>
                  </div>
                </div>

                {/* Affiliation Item */}
                <div className="detail-item">
                  <div className="detail-icon">
                    <i className="ri-building-line" aria-hidden="true"></i>
                  </div>
                  <div className="detail-info">
                    <span className="detail-label">ACADEMIC BASE</span>
                    <span className="detail-value">MSIT College, Kolkata</span>
                  </div>
                </div>
              </div>

              {/* Minimal Clean Social Circle list */}
              <div className="details-social-wrapper">
                <span className="socials-label">FIND ME ON</span>
                <div className="socials-circle-grid">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="social-circle-btn"
                      title={s.label}
                      style={{ "--social-glow": s.color } as React.CSSProperties}
                    >
                      <i className={s.iconClass} aria-hidden="true"></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Clean Form Layout */}
            <div className="contact-form-side">
              <h3 className="form-heading">Send a Message</h3>

              <form
                ref={formRef}
                id="contact-form"
                onSubmit={handleSubmit}
                className="form-container"
              >
                {/* Name Input */}
                <div className="form-input-group">
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    className="form-input-field"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="contact-name" className="form-input-label">Your Name</label>
                  <div className="form-input-bar"></div>
                </div>

                {/* Email Input */}
                <div className="form-input-group">
                  <input
                    type="email"
                    name="email"
                    id="contact-email"
                    className="form-input-field"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="contact-email" className="form-input-label">Your Email</label>
                  <div className="form-input-bar"></div>
                </div>

                {/* Message Textarea */}
                <div className="form-input-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-input-field form-textarea"
                    placeholder=" "
                    rows={4}
                    required
                  ></textarea>
                  <label htmlFor="message" className="form-input-label">Message Details</label>
                  <div className="form-input-bar"></div>
                </div>

                {/* Form feedback message banner */}
                {statusMsg && (
                  <div className={`status-banner ${statusMsg.includes("❌") || statusMsg.includes("⚠") ? "status-banner--err" : "status-banner--ok"}`}>
                    <i className={statusMsg.includes("❌") || statusMsg.includes("⚠") ? "ri-error-warning-line" : "ri-checkbox-circle-line"} aria-hidden="true"></i>
                    <span>{statusMsg}</span>
                  </div>
                )}

                {/* Form Submit Button */}
                <button type="submit" className="form-submit-pill">
                  <span>Send Message</span>
                  <i className="ri-arrow-right-line" aria-hidden="true"></i>
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Footer Copy copyright */}
        <p className="footer__copy">
          Designed by Rahul Samanta_ (rahulsamantaofficial00@gmail.com)
          <br />
          <b>© 2025 Rahul. All rights reserved.</b>
        </p>

      </div>

      {/* Toast Notification dialog */}
      {showPopup && (
        <div className="modern-toast">
          <div className="toast-icon">
            <i className="ri-check-line" aria-hidden="true"></i>
          </div>
          <div className="toast-text">
            <h4>Success!</h4>
            <p>Message successfully delivered.</p>
          </div>
          <button className="toast-close" onClick={() => setShowPopup(false)}>
            ×
          </button>
        </div>
      )}
    </section>
  );
}
