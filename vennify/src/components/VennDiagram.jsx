import React, { useState } from 'react';

const VennDiagram = () => {
  const [hoveredSection, setHoveredSection] = useState(null);

  // Determine if a section is currently being highlighted
  const isHighlighting = hoveredSection !== null;

  // Calculate the opacity for each section based on hover state
  const getOpacity = (section) => {
    if (!isHighlighting) return 1;
    return hoveredSection === section ? 1 : 0.4;
  };

  return (
    <div className="relative w-full h-full max-w-[500px] mx-auto">
      {/* Outer glow effect */}
      <div className="absolute inset-0 opacity-50 blur-xl">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <circle
            cx="175"
            cy="150"
            r="100"
            fill="#3B82F6"
            opacity="0.2"
          />
          <circle 
            cx="225"
            cy="150"
            r="100"
            fill="#8B5CF6"
            opacity="0.2"
          />
        </svg>
      </div>

      <svg 
        viewBox="0 0 400 300" 
        className="w-full h-full relative z-10"
        style={{ filter: 'drop-shadow(0px 0px 12px rgba(0,0,0,0.3))' }}
      >
        <defs>
          {/* Gradient for Set A */}
          <radialGradient id="setAGradient" cx="40%" cy="40%" r="60%" fx="40%" fy="40%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.5" />
          </radialGradient>
          
          {/* Gradient for Set B */}
          <radialGradient id="setBGradient" cx="60%" cy="40%" r="60%" fx="60%" fy="40%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
          </radialGradient>

          {/* Gradient for Intersection */}
          <linearGradient id="intersectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0891B2" stopOpacity="0.7" />
          </linearGradient>

          {/* Filters for glow effects */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base circles for Set A and Set B */}
        <g>
          {/* Set A Circle */}
          <circle
            cx="175"
            cy="150"
            r="100"
            fill="url(#setAGradient)"
            stroke="#3B82F6"
            strokeWidth="2"
            opacity={getOpacity('A')}
            onMouseEnter={() => setHoveredSection('A')}
            onMouseLeave={() => setHoveredSection(null)}
            className="transition-opacity duration-300 cursor-pointer"
          />

          {/* Set B Circle */}
          <circle
            cx="225"
            cy="150"
            r="100"
            fill="url(#setBGradient)"
            stroke="#8B5CF6"
            strokeWidth="2"
            opacity={getOpacity('B')}
            onMouseEnter={() => setHoveredSection('B')}
            onMouseLeave={() => setHoveredSection(null)}
            className="transition-opacity duration-300 cursor-pointer"
          />
        </g>

        {/* Intersection Overlay */}
        <g>
          {/* Intersection area with blend mode - this creates a proper visual intersection */}
          <circle 
            cx="175" 
            cy="150" 
            r="100" 
            fill="url(#intersectionGradient)"
            opacity={getOpacity('intersection')}
            style={{ mixBlendMode: 'multiply' }}
          />
          <circle 
            cx="225" 
            cy="150" 
            r="100" 
            fill="url(#intersectionGradient)" 
            opacity={getOpacity('intersection')}
            style={{ mixBlendMode: 'multiply' }}
          />

          {/* Interactive overlay for intersection */}
          <path
            d="M175,50 A100,100 0 0,1 275,150 A100,100 0 0,1 175,250 A100,100 0 0,1 75,150 A100,100 0 0,1 175,50 Z
               M175,250 A100,100 0 0,0 275,150 A100,100 0 0,0 175,50 A100,100 0 0,0 75,150 A100,100 0 0,0 175,250 Z"
            fill="transparent"
            onMouseEnter={() => setHoveredSection('intersection')}
            onMouseLeave={() => setHoveredSection(null)}
            className="cursor-pointer"
          />
        </g>

        {/* Shine effect overlay */}
        <circle
          cx="155"
          cy="120"
          r="80"
          fill="url(#radial)"
          opacity="0.1"
        >
          <radialGradient id="radial">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </circle>

        {/* Labels with better positioning and styling */}
        <g className="select-none">
          {/* Set A Label */}
          <text 
            x="115" 
            y="150" 
            fill="white" 
            fontSize="24" 
            fontWeight="bold"
            textAnchor="middle"
            filter="url(#glow)"
            opacity={getOpacity('A')}
            className="transition-opacity duration-300"
          >
            A
          </text>
          
          {/* Set B Label */}
          <text 
            x="285" 
            y="150" 
            fill="white" 
            fontSize="24" 
            fontWeight="bold"
            textAnchor="middle"
            filter="url(#glow)"
            opacity={getOpacity('B')}
            className="transition-opacity duration-300"
          >
            B
          </text>
          
          {/* Intersection Label */}
          <text 
            x="200" 
            y="150" 
            fill="white" 
            fontSize="20" 
            fontWeight="bold" 
            textAnchor="middle"
            filter="url(#glow)"
            opacity={getOpacity('intersection')}
            className="transition-opacity duration-300"
          >
            A∩B
          </text>
        </g>

        {/* Subtle border highlights */}
        <circle
          cx="175"
          cy="150"
          r="100"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.3"
          fill="none"
        />
        <circle
          cx="225"
          cy="150"
          r="100"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.3"
          fill="none"
        />
      </svg>

      {/* Optional: Legend below the diagram */}
      <div className="flex justify-center space-x-6 mt-4 text-white text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span>Set A</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
          <span>Set B</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
          <span>A∩B</span>
        </div>
      </div>
    </div>
  );
};

export default VennDiagram;