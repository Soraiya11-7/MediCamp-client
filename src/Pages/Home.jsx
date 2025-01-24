import React, { useEffect } from "react";
import logo from "../assets/mc2.png"
// import Button from "../components/Shared/Button";
import PopularCamps from "../components/Home/popularCamps";
import FeedbackRatings from "../components/Home/FeedbackRatings";
import Banner from "../components/Home/Banner";
import WhyJoinMedicalCamps from "../components/Home/WhyJoinMedicalCamps";
import Aos from "aos";
import "aos/dist/aos.css";


const Home = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000, 
       easing: "ease-out-cubic", 
        })
      },[]);
    return (
        <div className="">
            {/* <div
            className="relative h-[450px] bg-cover bg-center"
            style={{
                backgroundImage: `url(${logo})`, // Replace with your image URL
            }}
        >
            <div
                className="absolute inset-0 bg-green-950 bg-opacity-90"
                style={{
                    clipPath: "polygon(0 0, 65% 0, 50% 100%, 0% 100%)",
                }}
            ></div>

            <div className="absolute left-10 top-1/4 text-white max-w-lg">
                <p className="uppercase text-sm font-bold tracking-wider">
                Medical Camp Management System
                </p>
              
                <p className="mt-4 text-lg">
                This system helps the Organizer, and Participants easily manage and coordinate medical camps.
                </p>
                <Button btnText={"Read More"} center={false}></Button>
            </div>
        </div> */}
       <Banner></Banner>
        <PopularCamps></PopularCamps>
        <FeedbackRatings></FeedbackRatings>
        <WhyJoinMedicalCamps></WhyJoinMedicalCamps>
        
        </div>
    );
};

export default Home;



