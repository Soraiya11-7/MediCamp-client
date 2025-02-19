import React, { useState } from 'react';

const HowItWorks = () => {
    const [hoveredStep, setHoveredStep] = useState(1);
    return (
        <div>
          {/* How to Participate in the Camp */}
       {/* How to Participate in the Camp */}
       <section className="py-12  dark:bg-gray-700 text-center w-[90%] mx-auto">
        <h2 className="text-xl sm:text-2xl text-center md:text-3xl font-bold mb-6 dark:text-white text-green-800">How to Participate in the Camp</h2>
        <div className="flex flex-col items-center space-y-6 relative">
          {["Select a Camp and Click on 'View Details", "Register by Clicking on 'Join Camp' and Completing the Registration Form", "Make the Payment via Dashboard and Confirm Your Participation", "Provide feedback after attending the camp to share your experience"].map((text, index) => (
            <div key={index} className="relative w-full p-4 bg-white shadow-lg dark:text-black  rounded-lg border-l-4 border-green-800 transition-all duration-300"
                 onMouseEnter={() => setHoveredStep(index + 1)}
                 onMouseLeave={() => setHoveredStep(1)}>
              <p className={`text-sm md:text-base text-center font-medium ${hoveredStep === index + 1 ? "opacity-100" : "opacity-50"}`}>
                {hoveredStep === index + 1 ? text : `Step ${index + 1}`}
              </p>
            </div>
          ))}
        </div>
      </section>
        </div>
    );
};

export default HowItWorks;



