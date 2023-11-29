import React, { useState } from "react";

const Faq = () => {
  // State to track the active question
  const [activeIndex, setActiveIndex] = useState(null);

  // Function to toggle active question
  const toggleActive = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Array of FAQs
  const faqs = [
    { question: "How do I sign up?", answer: "You can sign up by clicking the Register link on the homepage." },
    { question: "What services do you offer?", answer: "We offer a variety of services including..." },
    { question: "Can I add multiple cars to my account?", answer: "Yes, HealthyCar allows you to add and manage multiple cars within a single account. Fleet managers can add and monitor an entire fleet from a centralized platform." },
    { question: "Is the platform secure?", answer: "Yes, HealthyCar prioritizes the security of your data. We use industry-standard encryption and security measures to safeguard your information." },
    // ... more FAQs
  ];

  return ( 
    <div className="Faq">
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-question ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleActive(index)}
          >
            <h2>{faq.question}</h2>
            <span className="faq-icon">{activeIndex === index ? '-' : '+'}</span>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
