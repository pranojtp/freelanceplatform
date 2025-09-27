import React, { useState } from "react";

// 1. Feature/Content Data Array
const cubeFacesData = [
  { name: "01. Automation", color: "bg-blue-500", detail: "Save 10 hrs/week with AI-powered workflows." },
  { name: "02. Analytics", color: "bg-green-500", detail: "Real-time insights on user retention." },
  { name: "03. Integrations", color: "bg-yellow-500", detail: "Connects with 500+ business tools." },
  { name: "04. Security", color: "bg-red-500", detail: "Enterprise-grade data encryption (AES-256)." },
  { name: "05. Collaboration", color: "bg-purple-500", detail: "Shared dashboards and team commenting." },
  { name: "06. Mobile Ready", color: "bg-pink-500", detail: "Full functionality on iOS and Android." },
];

// 2. Transform/Position Utility Array (Maps directly to the 6 faces)
const faceTransforms = [
  // Front: translateZ(Z_SIZE)
  (zSize) => `sm:[transform:translateZ(${zSize}px)] xs:[transform:translateZ(${zSize / 2}px)]`, 
  // Back: translateZ(-Z_SIZE)
  (zSize) => `sm:[transform:translateZ(-${zSize}px)] xs:[transform:translateZ(-${zSize / 2}px)]`,
  // Left: right(Z_SIZE) rotateY(-90deg)
  (zSize) => `sm:right-[${zSize}px] xs:right-[${zSize / 2}px] [transform:rotateY(-90deg)]`,
  // Right: left(Z_SIZE) rotateY(90deg)
  (zSize) => `sm:left-[${zSize}px] xs:left-[${zSize / 2}px] [transform:rotateY(90deg)]`,
  // Top: bottom(Z_SIZE) rotateX(90deg)
  (zSize) => `sm:bottom-[${zSize}px] xs:bottom-[${zSize / 2}px] [transform:rotateX(90deg)]`,
  // Bottom: top(Z_SIZE) rotateX(-90deg)
  (zSize) => `sm:top-[${zSize}px] xs:top-[${zSize / 2}px] [transform:rotateX(-90deg)]`,
];

export default function Cube() {
  // Z-size for the faces (250px cube size / 2 = 125px offset)
  const Z_OFFSET = 125; 
  
  // State to track which face is currently hovered (for the detail panel)
  const [hoveredFace, setHoveredFace] = useState(null);

  return (
    <div className="w-full mx-auto h-screen relative overflow-hidden [perspective:1000px] bg-gray-900">
      
      {/* 1. Rolling Cube Container */}
      <div 
        className="relative sm:h-[250px] sm:w-[250px] xs:h-[150px] xs:w-[150px] mx-auto top-1/2 transform -translate-y-1/2 [transform-style:preserve-3d] animate-roll"
        // Stop the cube animation on hover for inspection
        onMouseEnter={() => document.querySelector('.animate-roll').style.animationPlayState = 'paused'}
        onMouseLeave={() => document.querySelector('.animate-roll').style.animationPlayState = 'running'}
      >
        
        {/* Map through data to render 6 faces */}
        {cubeFacesData.map((face, index) => {
          // Determine the specific transform class for this face
          const transformClass = faceTransforms[index](Z_OFFSET);

          return (
            <div
              key={face.name}
              className={`absolute h-full w-full flex items-center justify-center text-center font-bold border-2 border-white rounded-xl text-lg sm:text-2xl 
                transition-all duration-300 cursor-pointer 
                ${face.color} ${transformClass}`}
              
              onMouseEnter={() => setHoveredFace(face)}
              onMouseLeave={() => setHoveredFace(null)}
            >
              <span className="p-2 bg-black bg-opacity-30 rounded">{face.name}</span>
            </div>
          );
        })}
      </div>
      
      {/* 2. Interactive Detail Panel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-32 sm:mt-52 text-center w-full max-w-sm p-4">
        {hoveredFace ? (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-2xl transition-opacity duration-300 opacity-100">
            <h3 className={`text-2xl font-extrabold mb-2 text-white`}>
              {hoveredFace.name.split('. ')[1]}
            </h3>
            <p className="text-gray-300">{hoveredFace.detail}</p>
          </div>
        ) : (
          <div className="text-gray-400 opacity-70 transition-opacity duration-300">
            <p className="font-semibold">Hover over a face to see the feature detail.</p>
          </div>
        )}
      </div>
    </div>
  );
}