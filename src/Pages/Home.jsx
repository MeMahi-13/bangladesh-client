import Banner from "../Components/Banner";
import AboutSection from "./Home/AboutSection";
import FeedbackPage from "./Home/Feedback";
import NewsPage from "./Home/News";

const Home = () => {
    return (
        <div className="bg-blue-500 dark:bg-amber-500">
        <div className="">
                <Banner/>
        </div>
        <AboutSection/>
        <NewsPage/>
        <FeedbackPage/>

        
        </div>
    );
};

export default Home;