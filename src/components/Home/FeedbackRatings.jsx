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


    return (
        <>
           <div className=''>
           <div className=' py-12  w-[90%] mx-auto bg-slate-100 rounded-t-md '>
            <h2 className="text-xl sm:text-2xl text-center md:text-3xl font-bold  mb-2 text-green-800">
            Feedback and Ratings
        </h2>
        <p className="text-base text-center sm:text-lg text-gray-800 w-[90%] md:w-[50%] mx-auto mb-10">
        Showcase participant feedback and ratings collected post-payment, offering insights into their camp experiences.
        </p>
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
                        spaceBetween: 20,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper w-[95%] sm:w-full mx-auto"
            >

                {feedbackData.map((feedback) => (
                    <SwiperSlide key={feedback._id}>
                        <div className="p-4 md:p-6 flex flex-col items-center bg-green-900 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                            {/* Image */}
                            <img
                                src={feedback.image}
                                alt={feedback.name}
                                className="w-24 h-24 rounded-full border-2 border-yellow-600 object-cover mb-2"
                            />
                            <h3 className="text-lg text-white font-semibold mb-3">{feedback.name}</h3>
                            <div className="mb-2">
                                <Rating
                                    style={{ maxWidth: 150 }}
                                    value={feedback.rating}
                                    readOnly
                                />
                            </div>
                            <p className="text-gray-100 text-center text-xs">{feedback.comment}</p>
                            <p className="text-sm text-gray-300 mt-4">{feedback.email}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>
           </div>
        </>
    );
}


export default FeedbackRatings;
