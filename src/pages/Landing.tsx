import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/path-to-your-image.jpg')", // Change this to your image path
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-12">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          Unlock Your Potential with AI Learning!
        </h1>
        <p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
          Join Intellecta and experience AI-driven, personalized learning
          tailored just for you. Sign in now to access interactive lessons,
          smart tutoring, and a future-ready education.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300">
            Get Started
          </button>
          <button className="border-2 border-yellow-400 text-white py-3 px-6 rounded-lg hover:bg-yellow-400 hover:text-black transition duration-300">
            See More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
