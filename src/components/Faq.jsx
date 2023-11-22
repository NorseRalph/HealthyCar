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
    { question: "How do I sign up?", answer: "You can sign up by clicking the Register link on the homepage." },
    { question: "What services do you offer?", answer: "We offer a variety of services including..." },
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
