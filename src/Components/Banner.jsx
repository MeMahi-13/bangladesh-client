import { faSearch, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router";
import SOSButton from "./SOSButton";


export default function Banner() {
  return (

    <section className="bg-[#D3DAD9] shadow relative px-8 md:px-16 py-12">
      <div className="flex flex-col md:flex-row items-start gap-12">
        {/* Left Text Section */}
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B3C53] mb-4 mt-20 tracking-wide">
            Together, we can make Bangladesh safer!
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
            Empowering citizens with fast crime reporting and instant access to emergency assistance across Bangladesh.
          </p>
          <div className="flex gap-4 flex-wrap">
               {/* Emergency Help */}
           <div className="animate-pulseGlow">
             <div className="animate-border">
              <SOSButton/>

            </div>

           </div>


            {/* Report a Crime */}
            <div className="">
              <Link to="/crime">
              
                <button className="bg-red-700 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:bg-red-800 transition-transform font-semibold cursor-pointer">
                    <FontAwesomeIcon icon={faShieldAlt} />
                  Report a Crime
                </button>
              </Link>
            </div>

            {/* Lost & Found */}
            <div>
              <div className="">
                <Link to="/lostfound">
                  <button className="bg-orange-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:bg-orange-600  font-semibold cursor-pointer">
                    <FontAwesomeIcon icon={faSearch} />
                    Report Lost/Found
                  </button>
                </Link>
              </div>
            </div>

         

          </div>

        </div>

        {/* Right Image Grid */}
        <div className=" hidden md:w-1/2 md:grid md:grid-cols-2 grid-rows-2 gap-4 h-[500px]">
          {/* Big image spanning full height on left */}
          <img
            src="https://i.postimg.cc/5jc3g2WV/pexels-ron-lach-10365943.jpg"
            alt="Medicines"
            className="w-full h-full object-cover rounded-lg row-span-2"
          />
          {/* Top right small image */}
          <img
            src="https://i.postimg.cc/5tvnHzhm/istockphoto-1405609480-612x612.jpg"
            alt="Health Info"
            className="w-full h-full object-cover rounded-lg"
          />
          {/* Bottom right small image */}
          <img
            src="https://i.postimg.cc/3w0Bxpvf/firefighter.jpg"
            alt="Tourism"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
