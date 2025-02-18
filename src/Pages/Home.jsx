import React, { useEffect } from "react";
import logo from "../assets/mc2.png"
// import Button from "../components/Shared/Button";
import PopularCamps from "../components/Home/PopularCamps";
import FeedbackRatings from "../components/Home/FeedbackRatings";
import Banner from "../components/Home/Banner";
import WhyJoinMedicalCamps from "../components/Home/WhyJoinMedicalCamps";
import Aos from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet-async";
import HowItWorks from "../components/Home/HowItWorks";
import Newsletter from "../components/Home/Newsletter";
import MeetExpertTeam from "../components/Home/MeetExpertTeam";
import FAQSection from "../components/Home/FAQSection";


const Home = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000, 
       easing: "ease-out-cubic", 
        })
      },[]);
    return (
        <div className="">
            <Helmet>
                <title>Medical Camp | Home</title>
            </Helmet>
       <Banner></Banner>
       <HowItWorks></HowItWorks>
       <FAQSection></FAQSection>
        <PopularCamps></PopularCamps>
        <MeetExpertTeam></MeetExpertTeam>
        <FeedbackRatings></FeedbackRatings>
        <WhyJoinMedicalCamps></WhyJoinMedicalCamps>
        <Newsletter></Newsletter>
        
        </div>
    );
};

export default Home;



