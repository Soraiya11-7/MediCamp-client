import React from 'react';
import im1 from "../../assets/doc1.jpeg"
import im2 from "../../assets/doc2.jpeg"
import im3 from "../../assets/doc3.jpeg"
import im4 from "../../assets/doc4.jpeg"

const MeetExpertTeam = () => {
 
        const experts = [
          { name: 'Dr. Jane Smith', specialty: 'Cardiology', image: im2 },
          { name: 'Dr. John Doe', specialty: 'Neurology', image: im1 },
          { name: 'Dr. Emily Davis', specialty: 'General Medicine', image: im4 },
          { name: 'Dr. Michael Brown', specialty: 'Pediatrics', image: im3 },
        ];
        return (
          <section className=" bg-gray-50  py-12">
            <div className=" w-[90%] container mx-auto">
              <h2 className="text-xl sm:text-2xl text-center md:text-3xl font-bold  mb-2 text-green-800">Meet Our Medical Experts</h2>
              <p className="text-base text-center sm:text-lg text-gray-800 w-[90%] md:w-[50%] mx-auto mb-10">
                Our team of experienced doctors and healthcare professionals is committed to delivering the best care.
              </p>
              <div className="grid grid-cols-1 w-[90%] mx-auto sm:w-full sm:grid-cols-2 md:grid-cols-4 gap-4">
                {experts.map((expert, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-full max-h-52 sm:h-36   mx-auto mb-4 rounded-t-lg "
                    />
                    <h3 className="text-xl font-semibold mb-1 px-2 ">{expert.name}</h3>
                    <p className="text-gray-600 px-2 mb-4 ">{expert.specialty}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      
};

export default MeetExpertTeam;