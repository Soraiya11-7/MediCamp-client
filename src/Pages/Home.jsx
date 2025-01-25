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
       <Banner></Banner>
        <PopularCamps></PopularCamps>
        <FeedbackRatings></FeedbackRatings>
        <WhyJoinMedicalCamps></WhyJoinMedicalCamps>
        
        </div>
    );
};

export default Home;



