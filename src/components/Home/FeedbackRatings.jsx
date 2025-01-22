import { Rating } from '@smastrom/react-rating';
// import { Swiper, SwiperSlide } from 'swiper/react';
import '@smastrom/react-rating/style.css';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';
// import { EffectCoverflow, Pagination } from 'swiper/modules';

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const FeedbackRatings = () => {
    const axiosPublic = useAxiosPublic();

    const { data: feedbackData = [] } = useQuery({
        queryKey: ['feedbackData'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/feedbacks`);
            return res.data;
        }
    });

    //     return (
    //         <section className="relative bg-gray-100 overflow-hidden py-10 md:py-20">
    //             <div className="container mx-auto px-6">
    //                 <div className="text-center mb-12">
    //                     <h2 className="text-4xl font-semibold text-blue-800 mb-4">Feedback and Ratings</h2>
    //                     <p className="text-lg text-gray-700">
    //                         Explore participant feedback and ratings derived from the participant dashboard after payment.
    //                         Gain insights into their camp experiences.
    //                     </p>
    //                 </div>

    //                 {/* Swiper Slider for Feedback */}
    //                 <Swiper
    //                     effect="coverflow"
    //                     grabCursor={true}
    //                     centeredSlides={true}
    //                     slidesPerView="auto"
    //                     coverflowEffect={{
    //                         rotate: 80,
    //                         stretch: 0,
    //                         depth: 100,
    //                         modifier: 1,
    //                         slideShadows: true,
    //                     }}
    //                     pagination={true}
    //                     modules={[EffectCoverflow, Pagination]}
    //                     className="mySwiper w-full md:w-[80%] mx-auto"
    //                 >
    //                     {feedbackData.map((feedback) => (
    //                         <SwiperSlide key={feedback._id}>
    //                             <div className="p-6 flex flex-col items-center bg-purple-400 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
    //                                 {/* Image */}
    //                                 <img
    //                                     src={feedback.image}
    //                                     alt={feedback.name}
    //                                     className="w-24 h-24 rounded-full object-cover mb-4"
    //                                 />
    //                                 <h3 className="text-xl font-semibold mb-2">{feedback.name}</h3>
    //                                 <div className="mb-4">
    //                                     <Rating
    //                                         style={{ maxWidth: 180 }}
    //                                         value={feedback.rating}
    //                                         readOnly
    //                                     />
    //                                 </div>
    //                                 <p className="text-gray-600 text-center">{feedback.comment}</p>
    //                                 <p className="text-sm text-gray-500 mt-4">{feedback.email}</p>
    //                             </div>
    //                         </SwiperSlide>
    //                     ))}
    //                 </Swiper>
    //             </div>
    //         </section>
    //     );
    // };


    return (
        <>
            <div className='my-10 w-[90%] mx-auto'>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper w-[90%] sm:w-full mx-auto"
            >

                {feedbackData.map((feedback) => (
                    <SwiperSlide key={feedback._id}>
                        <div className="p-6 flex flex-col items-center bg-purple-400 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                            {/* Image */}
                            <img
                                src={feedback.image}
                                alt={feedback.name}
                                className="w-24 h-24 rounded-full object-cover mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">{feedback.name}</h3>
                            <div className="mb-4">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={feedback.rating}
                                    readOnly
                                />
                            </div>
                            <p className="text-gray-600 text-center">{feedback.comment}</p>
                            <p className="text-sm text-gray-500 mt-4">{feedback.email}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>
        </>
    );
}


export default FeedbackRatings;
