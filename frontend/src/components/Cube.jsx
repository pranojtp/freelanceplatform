import React from "react";

export default function Cube() {
  return (
    <div className="w-full mx-auto h-screen [perspective:1000px] bg-[radial-gradient(rgb(5,_221,_245),_rgb(6,_150,_253))]">
      <div className="relative sm:h-[250px] sm:w-[250px] xs:h-[150px] xs:w-[150px] mx-auto top-1/2 transform -translate-y-1/2 [transform-style:preserve-3d] animate-roll">

        
        {/* Front */}
        <div className="absolute h-full w-full flex items-center justify-center bg-black bg-opacity-40 text-white font-bold border border-white rounded-lg sm:[transform:translateZ(125px)] xs:[transform:translateZ(75px)]">
          Front
        </div>

        {/* Back */}
        <div className="absolute h-full w-full flex items-center justify-center bg-black bg-opacity-40 text-white font-bold border border-white rounded-lg sm:[transform:translateZ(-125px)] xs:[transform:translateZ(-75px)]">
          Back
        </div>

        {/* Left */}
        <div className="absolute h-full w-full flex items-center justify-center bg-black bg-opacity-40 text-white font-bold border border-white rounded-lg sm:right-[125px] xs:right-[75px] [transform:rotateY(-90deg)]">
          Left
        </div>

        {/* Right */}
        <div className="absolute h-full w-full flex items-center justify-center bg-black bg-opacity-40 text-white font-bold border border-white rounded-lg sm:left-[125px] xs:left-[75px] [transform:rotateY(90deg)]">
          Right
        </div>

        {/* Top */}
        <div className="absolute h-full w-full flex items-center justify-center bg-black bg-opacity-40 text-white font-bold border border-white rounded-lg sm:bottom-[125px] xs:bottom-[75px] [transform:rotateX(90deg)]">
          Top
        </div>

        {/* Bottom */}
        <div className="absolute h-full w-full flex items-center justify-center bg-black bg-opacity-40 text-white font-bold border border-white rounded-lg sm:top-[125px] xs:top-[75px] [transform:rotateX(-90deg)]">
          Bottom
        </div>
      </div>
    </div>
  );
}
