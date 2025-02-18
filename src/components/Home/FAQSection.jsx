import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { FaQuestionCircle } from 'react-icons/fa'; // Using the question mark icon

const FAQSection = () => {
  const [expanded, setExpanded] = useState({});

  const toggleFAQ = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqs = [
    {
      question: 'What is a Medical Camp?',
      answer:
        'A medical camp is an event where healthcare professionals provide affordable medical consultations, screenings, and basic treatments to individuals in need. These camps are often organized in underserved or rural areas to improve access to healthcare.',
    },
    {
      question: 'How can I participate in a Medical Camp?',
      answer:
        'To participate in a medical camp, you can register online through the camp’s website or sign up on-site during the event. While most services are offered at a very low cost, there may be some charges for specific treatments or medications.',
    },
    {
      question: 'What services are offered at a Medical Camp?',
      answer:
        'Medical camps provide affordable medical consultations, general health check-ups, basic diagnostic tests (such as blood pressure, glucose level, etc.), and essential medications. Some camps may also offer specialized services, including dental care, vision tests, and vaccinations, which may have a small fee attached.',
    },
  ];

  return (
    <div className="px-8 py-12 w-[90%] mx-auto flex flex-col gap-12">
      <div className="flex flex-col text-left ">
        <p className="text-xl sm:text-2xl text-center md:text-3xl font-bold mb-2 text-green-800">
          <FaQuestionCircle className="inline-block mr-1 text-green-800" /> Medical Camp FAQs
        </p>
      </div>
      <ul className=" w-full  xl:w-[80%] mx-auto ">
        {faqs.map((faq, index) => (
          <li key={index}>
            <button
              className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
              aria-expanded={expanded[index] ? 'true' : 'false'}
              onClick={() => toggleFAQ(index)}
            >
              <span className="flex-1 text-base-content">{faq.question}</span>
              <svg
                className="flex-shrink-0 w-5 h-5 ml-auto fill-current rounded-full p-1 bg-green-800 text-white"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                  className={`transform origin-center transition duration-200 ease-out ${expanded[index] ? 'rotate-90' : ''}`}
                ></rect>
                <rect
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                  className={`transform origin-center rotate-90 transition duration-200 ease-out ${expanded[index] ? 'rotate-90' : ''}`}
                ></rect>
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded[index] ? 'max-h-96' : 'max-h-0'}`}
            >
              <div className="pb-5">{faq.answer}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQSection;
