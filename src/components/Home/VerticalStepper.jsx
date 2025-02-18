import React from 'react';

const VerticalStepper = ({ children }) => {
  return (
    <div className="flex flex-col items-center w-full relative">
      {children}
    </div>
  );
};

VerticalStepper.Step = ({ stepNumber, label, lastStep }) => {
  return (
    <div className="flex flex-col items-center mb-6 relative">
      {/* Step Circle */}
      <div className="w-8 h-8 rounded-full border-2 border-green-800 bg-green-800 flex items-center justify-center">
        <span className="text-white">{stepNumber}</span>
      </div>

      {/* Step Label */}
      <div className="mt-2 text-sm text-center">
        <p>{label}</p>
      </div>

      {/* Connect Line */}
      {!lastStep && (
        <div className="absolute w-px bg-gray-300 top-8 bottom-0 left-1/2 transform -translate-x-1/2"></div>
      )}
    </div>
  );
};

export default VerticalStepper;
