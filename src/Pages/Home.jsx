import { useEffect } from "react";
import Banner from "../Components/Banner";
import LanguageSelector from "../Components/LanguageSelector";
import AboutStats from "./Home/AboutStats";
import HowItWorks from "./Home/HowItWorks";
import LostFoundPreview from "./Home/LostFoundPreview";
import RecentReports from "./Home/RecentReports";

const Home = () => {
    useEffect(() => {
        if (!window.googleTranslateElementInitCalled) {
            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        includedLanguages: "en,bn",
                    },
                    "google_translate_element"
                );
            };

            window.googleTranslateElementInitCalled = true;

            const script = document.createElement("script");
            script.src =
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            document.body.appendChild(script);

            return () => document.body.removeChild(script);
        }
    }, []);

    return (
        <div className="bg-green-50 open-sans">
            <div id="google_translate_element"></div>
            <LanguageSelector />
            <Banner />
            <HowItWorks />
            <RecentReports />
            <LostFoundPreview/>
            <AboutStats />
        </div>
    );
};

export default Home;
