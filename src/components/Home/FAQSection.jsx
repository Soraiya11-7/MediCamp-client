import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

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

  const imgLight = 'https://i.ibb.co.com/Xkkrw2st/light-Q.jpg';
  const imgDark = 'https://i.ibb.co.com/gFb5GdpS/Minimalist-Did-You-Know-Question-Instagram-Post.png';

  return (
    <div className="w-[85%] mx-auto mt-10 py-10">
      {/* <div className=''>

      </div> */}
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800 dark:text-white">
          Medical Camp FAQs
        </h2>
      </div>

      {/* Content: Image + FAQs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Image */}
        <div className="max-w-[300px] md:w-[35%] h-[250px] md:h-auto flex justify-center items-center">
          <img
            src={imgLight}
            alt="FAQ Light"
            className="block dark:hidden  w-full h-full object-cover rounded-lg"
          />
            <img
            src={imgDark}
            alt="FAQ Dark"
            className="hidden dark:block  w-full h-full object-cover rounded-lg"
          />
          {/* <img
            src={imgDark}
            alt="FAQ Dark"
            className="hidden dark:block w-full h-full object-cover rounded-lg"
          /> */}
        </div>

        {/* FAQ Content */}
        <div className="w-full md:w-[65%]  ">
          <ul className="">
            {faqs.map((faq, index) => (
              <li className='dark:border-y dark:border-gray-700 p-4' key={index}>
                <button
                  className="relative flex items-center w-full py-4 text-base font-semibold text-left border-t border-base-content/10 md:text-lg"
                  aria-expanded={expanded[index] ? 'true' : 'false'}
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="flex-1 text-black dark:text-white">{faq.question}</span>
                  <svg
                    className="flex-shrink-0 w-5 h-5 ml-4 fill-current rounded-full p-1 bg-green-800 dark:bg-yellow-600 text-white"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className={`transform origin-center transition duration-200 ease-out ${
                        expanded[index] ? 'rotate-90' : ''
                      }`}
                    ></rect>
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                        expanded[index] ? 'rotate-90' : ''
                      }`}
                    ></rect>
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expanded[index] ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="pb-5 text-black dark:text-gray-300">{faq.answer}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
