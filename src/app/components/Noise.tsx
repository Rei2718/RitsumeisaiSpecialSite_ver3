import React from 'react';

const Noise = () => {
  return (
    <>
      {/* SVG Noise Filter */}
      <svg style={{ display: 'none' }}>
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="5" 
            stitchTiles="stitch" 
          />
          <feColorMatrix
            type="matrix"
            values="0.1 0.1 0.1 0 0
                    0.1 0.1 0.1 0 0
                    0.1 0.1 0.1 0 0
                    0 0 0 0.3 0"
          />
          <feComponentTransfer>
            <feFuncA type="gamma" amplitude="0.2" exponent="1" offset="0.1" />
          </feComponentTransfer>
        </filter>
      </svg>
      {/* Noise Overlay */}
      <div className='fixed top-0 left-0 w-full h-full z-20 pointer-events-none' style={{ mixBlendMode: 'overlay' }}>
        <div className='w-full h-full' style={{ filter: 'url(#noiseFilter)', background: '#f5f5f5' }}></div>
      </div>
    </>
  );
};

export default Noise;
