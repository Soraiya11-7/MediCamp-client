
import img from "../../assets/flat-design-join-us-message_23-2148954904.jpg"

const WhyJoinMedicalCamps = () => {
  
    return (
        <section id="join-us" className="pt-8  bg-slate-100" data-aos="fade-right" >
           <div className="py-4 sm:py-10 w-[90%] mx-auto">
               
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-green-900"> Why Join Our Medical Camps?</h2>
          <div className="flex flex-col md:flex-row items-center  gap-8 md:gap-6 border p-4 md:p-8 rounded-lg border-teal-700 bg-green-800 text-white">
            <div className=" w-full mx-auto sm:w-[95%] md:w-[40%] h-auto md:h-[240px] rounded-xl">
              <img
                src={img}
                alt="Why Join Us"
                className="rounded-xl shadow w-full h-full object-cover overflow-hidden"
              />
            </div> 
    
            {/* Right Side...................................... */}
            <div className="md:w-[55%]">
              <h3 className="text-lg sm:text-2xl md:text-xl lg:text-2xl font-bold mb-4 ">Discover Exclusive Benefits</h3>
              <p className="text-sm sm:text-base ">
              Our medical camps are designed to provide a unique opportunity for
              individuals to access quality healthcare while participating in
               community-driven wellness initiatives. Here's why you should join:
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-0.5 text-sm sm:text-base md:text-sm lg:text-base italic">
              <li>Free consultations with certified healthcare professionals.</li>
              <li>Access to preventive care and health education.</li>
              <li>Opportunity to contribute to the well-being of your community.</li>
             <li>On-the-spot diagnostics and free medications.</li>
              </ul>
            </div>
          </div>
           </div>
        </section>
      );
};
  
  export default WhyJoinMedicalCamps;
  