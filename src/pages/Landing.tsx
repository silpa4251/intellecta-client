import { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import "../index.css";
import createAccount from "../assets/CreateAccount.png";
import userAssesment from "../assets/UserAssesment.png";
import aiChat from "../assets/AIChat.png";
import aiAssistance from "../assets/AiAssistance.png";
import gamified from "../assets/Gamified.png";
import trackProgress from "../assets/TrackProgress.png";
import keepLearn from "../assets/LearnGrow.png";

const Hero: React.FC = () => {
  const steps = [
    { id: 1, title: "1. Create Account", image: createAccount },
    { id: 2, title: "2. User Assesment", image: userAssesment },
    { id: 3, title: "3. AI Powered Learning Recommendations", image: aiAssistance },
    { id: 4, title: "4. Interactive AI Tutor Assesments", image: aiChat },
    { id: 5, title: "5. Gamified Learning", image: gamified },
    { id: 6, title: "6. Track Your Progress", image: trackProgress },
    { id: 7, title: "7. Learn and Grow", image: keepLearn },
  ];
  
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const glideInstance = useRef<any>(null); // Glide has no official TS support
  
    useEffect(() => {
      if (sliderRef.current) {
        glideInstance.current = new (Glide as any)(sliderRef.current, {
          type: "carousel",
          startAt: 0,
          perView: 3, // Show 3 cards at once
          gap: 20,
          autoplay: 2000, // Auto slide every 3 sec
          hoverpause: true, // Pause on hover
          rewind: true, // Loop back to the start
          breakpoints: {
            1024: { perView: 2 }, // 2 slides on tablets
            768: { perView: 1 }, // 1 slide on mobile
          },
        });
  
        glideInstance.current.mount();
      }
  
      return () => {
        glideInstance.current?.destroy();
      };
    }, []);

  return (
    <>
    <section className="w-full h-screen flex items-center sm:justify-items-start text-white bg-overlay">
      {/* Content */}
      <div className="text-center sm:text-left sm:px-28">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          Unlock Your Potential with AI Learning!
        </h1>
        <p className="text-lg sm:text-xl mb-6 max-w-2xl">
          Join Intellecta and experience AI-driven, personalized learning
          tailored just for you. Sign in now to access interactive lessons,
          smart tutoring, and a future-ready education.
        </p>

        {/* Buttons */}
        <div className="flex gap-6 justify-center sm:justify-start">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black sm:justify-items-start font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300">
            Get Started
          </button>
          <button className="border-2 border-yellow-400 text-white py-3 px-6 rounded-lg hover:bg-yellow-400 hover:text-black transition duration-300">
            See More
          </button>
        </div>
      </div>
    </section>

    <section className="bg-[#0B1A36] h-screen py-12 text-white text-center bg-gradient-to-b from-[#081A37] to-[#3A6073]">
    {/* Section Title */}
    <div className="mb-6">
      <div className="inline-block px-4 py-2 bg-white text-black rounded-lg font-semibold">
        How It Works
      </div>
      <h2 className="text-3xl font-bold mt-4">How To Get Started</h2>
    </div>

    {/* Glide Slider */}
    <div className="glide relative w-full h-96" ref={sliderRef}>
      {/* Track */}
      <div className="glide__track py-6" data-glide-el="track">
        <ul className="glide__slides">
          {steps.map((step) => (
            <li key={step.id} className="glide__slide flex justify-center">
              <div className="border-1 shadow-lg h-96 text-white p-6 rounded-lg w-80">
                <img src={step.image} alt={step.title} className="w-full mb-4" />
                <h3 className="text-lg font-semibold">{step.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <button
          data-glide-dir="<"
          className="bg-white text-black p-3 rounded-full shadow-md hover:bg-gray-200"
        >
          ◀
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <button
          data-glide-dir=">"
          className="bg-white text-black p-3 rounded-full shadow-md hover:bg-gray-200"
        >
          ▶
        </button>
      </div>
    </div>
  </section>
  </>
  );
};


export default Hero;
