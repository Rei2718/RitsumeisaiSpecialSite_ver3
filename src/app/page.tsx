"use client";

import Link from "next/link";
import { Londrina_Solid, Londrina_Shadow } from "next/font/google";
import ActiveEventsList from "./components/ActiveEventsList";
import Image from 'next/image';

const londrinaShadow = Londrina_Shadow({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
});
const londrinaSolid = Londrina_Solid({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
});

function HomeContent() {
  return (
    <div className="relative z-10">
      <section className="relative h-svh w-screen">
        <ActiveEventsList />
        
        {/* MainText */}
        <div className="flex flex-col items-center justify-center text-center z-10 h-3/4 w-10/12 mx-auto">
          <div className="font-londrina mb-4 px-2 w-full">
            <div className={`${londrinaSolid.className} text-6xl md:text-7xl lg:text-10xl`}>
              THE 29TH
            </div>
            <div className={`${londrinaShadow.className} text-6xl md:text-7xl lg:text-10xl`}>
              RITSUMEISAI
            </div>
          </div>
          <div className="mb-1 text-lg sm:text-lg md:text-2xl lg:text-3xl w-full">
            2024.7.20 (Sat) - 2024.7.21 (Sun)
          </div>
          <div className="text-base sm:text-base md:text-base lg:text-lg w-full">
            @RitsumeikanKeisho Ver.3.1
          </div>
          <div className="absolute inset-0 flex items-center justify-center -z-10 floating">
            <Image src="/svg/globe.svg" alt="Background Image" width={500} height={500} className="w-11/12 h-auto max-w-xl opacity-40 transform" />
          </div>
        </div>
        
        {/* GetButton */}
        <div className="absolute inset-x-0 bottom-[20svh] w-9/12 max-w-md mx-auto z-10">
          <Link href="/start">
            <button className="bg-white backdrop-filter backdrop-blur-sm shadow-md py-2 px-4 w-full text-base rounded-full">
              GET STARTED →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomeContent;
