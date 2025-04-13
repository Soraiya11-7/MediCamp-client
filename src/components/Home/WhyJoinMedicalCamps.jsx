import { FaHeartbeat, FaUserMd, FaStethoscope, FaFileMedical, FaHospital } from 'react-icons/fa';
import Marquee from 'react-fast-marquee';

const WhyJoinMedicalCamps = () => {
  return (
    <section id="join-us" className=" ">
      <div className="py-4 sm:py-10 w-[90%] mx-auto">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-green-900 dark:text-white">
          Why Join Our Medical Camps?
        </h2>

        {/* Marquee Section ................*/}
        <Marquee speed={60} gradient={false} pauseOnHover className="overflow-hidden">

          <div className="flex gap-8">
            {/* Card 1 */}
            <div className="bg-green-800 dark:border-2 dark:border-white text-white p-4 rounded-lg w-[240px] md:w-[270px] h-[280px] flex flex-col items-center shadow-lg hover:shadow-2xl transition-shadow duration-300 ml-4">
              <FaHeartbeat className="text-6xl mb-4 md:mb-8 text-yellow-500" />
              <div className="">
                <h3 className="font-bold text-xl mb-8 text-center">Free Consultations</h3>
                <p className="text-sm text-center">Benefit from free consultations with certified healthcare professionals.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-green-800 dark:border-2 dark:border-white text-white p-4 rounded-lg w-[240px] md:w-[270px] h-[280px] flex flex-col items-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <FaUserMd className="text-6xl mb-4 md:mb-8 text-yellow-500" />
              <div className="">
                <h3 className="font-bold text-xl mb-2 text-center">Preventive Care & Education</h3>
                <p className="text-sm text-center">Gain access to preventive healthcare services and educational resources on health management.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-green-800 dark:border-2 dark:border-white text-white p-4 rounded-lg w-[240px] md:w-[270px] h-[280px] flex flex-col items-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <FaStethoscope className="text-6xl mb-4 md:mb-8 text-yellow-500" />
              <div className="">
                <h3 className="font-bold text-xl  text-center mb-2 md:mb-8">Community Engagement</h3>
                <p className="text-sm text-center">Contribute to the overall well-being of your community through active participation in healthcare initiatives.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-green-800 dark:border-2 dark:border-white text-white p-4 rounded-lg w-[240px] md:w-[270px]  h-[280px] flex flex-col items-center shadow-lg hover:shadow-2xl transition-shadow duration-300 mr-4">
              <FaFileMedical className="text-6xl mb-4 md:mb-8 text-yellow-500" />
              <div className="">
                <h3 className="font-bold text-xl mb-2 text-center">On-the-Spot Diagnostics & Medications</h3>
                <p className="text-sm text-center">Receive timely diagnostics and essential medications directly at the camp.</p>
              </div>
            </div>

            {/* New Related Card */}
            <div className="bg-green-800 dark:border-2 dark:border-white text-white p-4 rounded-lg w-[240px] md:w-[270px] h-[280px] flex flex-col items-center shadow-lg hover:shadow-2xl transition-shadow duration-300 mr-4">
              <FaHospital className="text-6xl mb-4 md:mb-8 text-yellow-500" />
              <div className="">
                <h3 className="font-bold text-xl mb-8 text-center">Hospital Services</h3>
                <p className="text-sm text-center">Access a variety of hospital services such as laboratory tests, imaging, and other advanced medical services.</p>
              </div>
            </div>
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default WhyJoinMedicalCamps;
