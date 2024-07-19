import React from 'react';

export default function Map() {
    return (
        <>
            <section className="flex items-center justify-center h-lvh text-center px-4 sm:px-10">
                <div className="text-black z-50 w-full pb-20">
                    <h1 className='py-10 text-2xl'>バスダイヤ (確定版)</h1>
                    <p className='text-base py-5'>小さくてごめんなさい....拡大してご覧ください。</p>
                    <div className="grid grid-cols-1 gap-4">
                        <img src="/map/bus1.webp" alt="Image 1" className="w-full" />
                        <img src="/map/bus2.webp" alt="Image 2" className="w-full" />
                    </div>
                </div>
            </section>
        </>
    );
}
