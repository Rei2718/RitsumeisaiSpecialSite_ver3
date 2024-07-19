import React from 'react';
import Image from 'next/image';

export default function Credit() {
    const credits = [
        { name: 'Ishikawa Ichiro', role: 'Developer', imgSrc: '/start/Ichiro.webp' },
        { name: 'Ochiai Masaya', role: 'Data Manager', imgSrc: '/start/Masaya.webp' },
        { name: 'Fujiwara Haku', role: 'Adviser', imgSrc: '/start/Haku.webp' },
        { name: 'Ito Shido', role: 'Special Thanks', imgSrc: '/start/Shido.webp' },
    ];

    const tools = [
        { name: 'Vercel', imgSrc: '/start/Vercel.png', width: 100, height: 50 },
        { name: 'Next.js', imgSrc: '/start/nextjs.png', width: 150, height: 50 },
    ];

    return (
        <section className="flex items-center justify-center h-lvh text-center px-4 sm:px-10">
            <div className="text-black z-30 w-full pb-10">
                <p className="text-3xl">~ Website Credits ~</p>
                <div className="flex flex-col items-center space-y-2 mt-8">
                    {credits.map(({ name, role, imgSrc }) => (
                        <div className="flex items-center space-x-1" key={name}>
                            <div className="w-16 h-16 flex items-center justify-center">
                                <Image src={imgSrc} alt={`${name} Icon`} width={50} height={50} className="rounded-full" />
                            </div>
                            <span className="text-2xl">{name}</span>
                            <span>({role})</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center text-center pt-8 space-y-4">
                    <p className="text-xl">Constructed with</p>
                    <div className="flex space-x-8">
                        {tools.map(({ name, imgSrc, width, height }) => (
                            <div key={name} className="flex justify-center items-center" style={{ width, height }}>
                                <Image src={imgSrc} alt={`${name} Logo`} layout="intrinsic" width={width} height={height} objectFit="contain" />
                            </div>
                        ))}
                    </div>
                    <div className="pt-8">
                        <p className="text-xl">Music</p>
                        <p className="text-lg">Studio Kolomna</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
