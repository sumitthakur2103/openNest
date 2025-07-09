import React from "react";

export default function FAQSection() {
  const faqs = [
    {
      question: "How do I book?",
      answer:
        "Booking a property is easy! Simply search for your desired location, select your dates, and browse available options. Once you find the perfect place, follow the prompts to complete your reservation.",
    },
    {
      question: "How to list properties?",
      answer:
        "To list your property, click on the 'Become a Partner' button on our homepage. Fill out the required information about your property, including photos and pricing. Once submitted, our team will review your listing and get back to you.",
    },
    {
      question: "What are the fees?",
      answer:
        "We charge a small commission fee on each booking made through our platform. This fee helps us maintain the website and provide excellent service. You will be informed of any fees during the listing process.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking within the cancellation policy specified at the time of booking. Please check your booking confirmation for details. If you need assistance, our support team is here to help.",
    },
    {
      question: "How to contact support?",
      answer:
        "You can reach our support team via the 'Contact' button on the website. We are available through email and chat to assist you with any inquiries. Our goal is to provide prompt and helpful responses.",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#0A0A08",
        color: "white",
        padding: "4rem 2rem",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>FAQs</h2>
        <p style={{ color: "#ccc", marginBottom: "2.5rem" }}>
          Find answers to your questions about booking and listing properties on
          our platform.
        </p>

        {faqs.map((item, index) => (
          <div key={index} style={{ marginBottom: "2.5rem" }}>
            <hr style={{ borderColor: "#444" }} />
            <div style={{ display: "flex", gap: "2rem", paddingTop: "1rem" }}>
              <strong style={{ flex: "1", fontSize: "1.1rem" }}>
                {item.question}
              </strong>
              <p style={{ flex: "3", color: "#ccc", fontSize: "1rem" }}>
                {item.answer}
              </p>
            </div>
          </div>
        ))}

        <div style={{ marginTop: "4rem" }}>
          <h3 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            Still have questions?
          </h3>
          <p style={{ color: "#ccc", marginBottom: "1.5rem" }}>
            We're here to help!
          </p>
          <button
            style={{
              padding: "0.75rem 1.5rem",
              border: "2px solid white",
              borderRadius: "8px",
              background: "transparent",
              color: "white",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
