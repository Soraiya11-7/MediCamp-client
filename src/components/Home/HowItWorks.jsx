import React, { useState } from 'react';

const HowItWorks = () => {
    const [hoveredStep, setHoveredStep] = useState(1);
    return (
        <div>
          {/* How to Participate in the Camp */}
       {/* How to Participate in the Camp */}
       <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-6">How to Participate in the Camp</h2>
        <div className="flex flex-col items-center space-y-6 relative">
          {["Select a Camp and Click on 'View Details", "Register by Clicking on 'Join Camp' and Completing the Registration Form", "Make the Payment via Dashboard and Confirm Your Participation", "Provide feedback after attending the camp to share your experience"].map((text, index) => (
            <div key={index} className="relative w-3/4 p-4 bg-white shadow-lg rounded-lg border-l-4 border-green-800 transition-all duration-300"
                 onMouseEnter={() => setHoveredStep(index + 1)}
                 onMouseLeave={() => setHoveredStep(1)}>
              <p className={`text-lg font-semibold ${hoveredStep === index + 1 ? "opacity-100" : "opacity-50"}`}>
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



