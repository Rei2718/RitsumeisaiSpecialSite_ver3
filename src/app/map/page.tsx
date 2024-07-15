import React from 'react';
import ColorPresetSelector from '../components/ColorPresetSelector';

export default function map() {
    return (
        <>
            <section className="flex items-center justify-center h-lvh text-center px-4 sm:px-10">
                <div className="text-black z-50">
                    <ColorPresetSelector />
                </div>
            </section>
        </>
    );
  }
  


  
