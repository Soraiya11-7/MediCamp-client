import { FaHeartbeat, FaUserMd, FaStethoscope, FaFileMedical, FaHospital } from 'react-icons/fa';
import Marquee from 'react-fast-marquee';

const WhyJoinMedicalCamps = () => {

  const cardClass = `
  relative group hover:z-10
  before:content-[''] before:absolute before:inset-0
  before:rounded-lg before:bg-transparent
  before:border-r-4 before:border-b-4 before:border-green-800 dark:before:border-yellow-700
  before:transition-all before:duration-300
  group-hover:before:border-r-8 group-hover:before:border-b-8 group-hover:before:translate-x-2 group-hover:before:translate-y-2 w-full sm:w-[280px] md:w-[270px] h-[240px]

  bg-white dark:bg-gray-900 dark:text-white
  rounded-lg shadow-lg p-4 flex flex-col items-center justify-center
  transition duration-300 transform hover:scale-105
  group-hover:blur-sm hover:!blur-none
`;

const cardsData = [
  {
    icon: <FaHeartbeat className="text-6xl mb-4 md:mb-6 dark:text-yellow-500 text-green-900" />,
    title: "Free Consultations",
    description: "Benefit from free consultations with certified healthcare professionals for guidance, advice, and expert medical insight.",
    
  },
  {
    icon: <FaUserMd className="text-6xl mb-4 md:mb-8 dark:text-yellow-500 text-green-900" />,
    title: "Preventive Care & Education",
    description: "Gain access to preventive healthcare services and educational resources on health management.",
  },
  {
    icon: <FaStethoscope className="text-6xl mb-4 md:mb-6 dark:text-yellow-500 text-green-900" />,
    title: "Community Engagement",
    description: "Contribute to the overall well-being of your community through active participation in healthcare initiatives.",
  },
  {
    icon: <FaFileMedical className="text-6xl mb-4 md:mb-8 dark:text-yellow-500 text-green-900" />,
    title: "On-the-Spot Diagnostics & Medications",
    description: "Receive timely diagnostics and essential medications directly at the camp.",
  },
  {
    icon: <FaHospital className="text-6xl mb-4 md:mb-6 dark:text-yellow-500 text-green-900" />,
    title: "Hospital Services",
    description: "Access a variety of hospital services such as laboratory tests, imaging, and other advanced medical services.",
  },
];

  return (
    <section id="join-us" className=" ">
      <div className="py-4 sm:py-10 w-[90%] mx-auto">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-green-900 dark:text-white">
          Why Join Our Medical Camps?
        </h2>

        {/* Marquee Section ................*/}
        <Marquee speed={60} gradient={false} pauseOnHover className="overflow-hidden">

        <div className="flex flex-wrap justify-center gap-6 px-4 py-6">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className={cardClass}
        >
          {card.icon}
          <div className="flex flex-col justify-between h-full">
            <h3 className="font-bold text-xl mb-2 text-center">{card.title}</h3>
            <p className="text-sm text-center w-[95%] mx-auto">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
        </Marquee>
      </div>
    </section>
  );
};

export default WhyJoinMedicalCamps;
