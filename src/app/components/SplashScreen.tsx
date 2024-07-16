"use client"

import Image from 'next/image';

export default function SplashScreen() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="logo mb-4">
                <Image src="/logo.png" alt="Logo" width={64} height={64} className="animate-bounce"/>
            </div>
            <div className="animate-pulse text-center">
              <div className="text-[#81d8d0] text-lg">Loading...</div>
              <div className="text-[#81d8d0] text-sm">※スマホでの使用を想定しています</div>
            </div>
        </div>
    );
}
