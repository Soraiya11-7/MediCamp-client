import { Rating } from '@smastrom/react-rating'
// import logo from '../../assets/mc2.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import '@smastrom/react-rating/style.css'
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';


const FeedbackRatings = () => {

    const axiosPublic = useAxiosPublic();

    const { data: feedbackData = [] } = useQuery({
        queryKey: ['feedbackData'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/feedbacks`);
            return res.data;
        }
    })

    return (
        <section className="relative bg-gray-100 overflow-hidden py-20">
            {/* Parallax Background */}

            <div className=" px-6 ">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-semibold text-blue-800 mb-4">Feedback and Ratings</h2>
                    <p className="text-lg text-gray-700">
                        Explore participant feedback and ratings derived from the participant dashboard after payment.
                        Gain insights into their camp experiences.
                    </p>
                </div>
                {/* <div className="grid md:grid-cols-2 gap-12 o">
                    {feedbackData.map((feedback, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
                        >
                            <div className="p-6 flex flex-col items-center">
                               
                                <img 
                                    src={feedback.image} 
                                    alt={feedback.name} 
                                    className="w-20 h-20 rounded-full object-cover mb-4" 
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
                        </div>
                    ))}
                </div> */}
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 80,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper md:w-[80%] mx-auto"
                >
                    {
                        feedbackData.map((feedback, index) => <SwiperSlide key={feedback._id}>
                            <div className="p-6 flex flex-col items-center md:w-[40%] mx-auto bg-purple-400">
                                {/* Image */}
                                <img
                                    src={feedback.image}
                                    alt={feedback.name}
                                    className="w-20 h-20 rounded-full object-cover mb-4"
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
                        </SwiperSlide> )
       }

                </Swiper>
            </div>
        </section>
    );
};

export default FeedbackRatings;
