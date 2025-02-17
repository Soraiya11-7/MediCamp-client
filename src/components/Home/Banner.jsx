
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

// Import images
import img1 from '../../assets/1480925-medical-camp.png';
import img2 from '../../assets/c3.png';
import img3 from '../../assets/1600w-PdjF3CCiHLs.png';
import { easeOut, motion } from "framer-motion";

const Banner = () => {
    const slides = [
        {
            id: 1,
            image: img1,
            title: "Healthcare Outreach 2023",
            achievements: [
                { count: "200+", label: "Surgeries" },
                { count: "500+", label: "Health Check-ups" },
            ],
            positiveOutcome:
                "Improved community health and brought smiles to many.",
        },
        {
            id: 2,
            image: img2,
            title: "Health Initiative",
            achievements: [
                { count: "1000+", label: "Medicine Kits" },
                { count: "50+", label: "Seminars" },
            ],
            positiveOutcome:
                "Raised awareness on hygiene and preventive healthcare in rural communities.",
        },
        {
            id: 3,
            image: img3,
            title: "Empowering Healthcare",
            achievements: [
                { count: "200+", label: "Critical Surgeries" },
                { count: "1000+", label: "Families Impacted" },
            ],
            positiveOutcome:
                "Empowered patients to recover and contribute to society.",
        },
    ];

    return (
        <Carousel
            className=''
        >
            {slides.map((slide) => (
                <div key={slide.id} className="relative h-[250px] sm:h-[300px] md:h-[480px]">
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover rounded-b-lg "
                    />
                    {/* Text Content inside the Slide..... */}
                    <div
                        className="absolute hidden md:flex inset-0 bg-green-700 bg-opacity-90"
                        style={{
                            clipPath: "polygon(0 0, 55% 0, 40% 100%, 0% 100%)",
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 md:bg-opacity-40  border border-red-500  ">
                        <div className='container w-[90%] h-full mx-auto  '>
                        <div className="absolute   h-full text-white w-[90%] md:max-w-lg mx-auto md:mx-0 z-10 flex flex-col justify-center ">
                            <motion.h2
                                animate={{
                                    x: [0, 15, 0],
                                    color: ["#ecff33", "#33ffe3", "#ff6133", "#ecff33"]
                                }}
                                transition={{ duration: 2, ease: "easeOut", repeat: Infinity }}
                                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center md:text-left -ml-2 sm:-ml-0"
                            >
                                {slide.title}
                            </motion.h2>

                            <div className="p-0.5 md:p-2 mt-4 md:mt-12 border-2 w-[70%] mx-auto md:mx-0 sm:w-[60%] lg:w-[70%] border-white rounded-lg text-white text-center ">
                                <p className="text-xs md:text-base italic">{slide.positiveOutcome}</p>
                            </div>

                            <div className="mt-6 w-[70%] mx-auto md:mx-0  md:w-[55%] lg:w-[60%] mb-2 ">
                                {/* Achievements */}
                                <div className="grid grid-cols-2 gap-2 lg:gap-5">
                                    {slide.achievements.map((achievement, index) => (
                                        <div
                                            key={index}
                                            className="relative px-2 py-1 sm:p-3 rounded-2xl shadow-lg hover:shadow-xl "
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-900 md:bg-gradient-to-r md:from-green-600 md:to-green-500 rounded-2xl opacity-90 md:opacity-70"></div>
                                            <div className="relative z-10 text-center flex flex-col justify-center items-center">
                                                <p className="text-base sm:text-xl md:text-2xl font-extrabold text-white">
                                                    {achievement.count}
                                                </p>
                                                <p className="text-xs sm:text-sm md:text-base font-medium italic text-white opacity-90">
                                                    {achievement.label}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                </div>


                            </div>
                        </div>

                        </div>
                       


                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default Banner;
