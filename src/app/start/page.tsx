"use client";

import { useState, useEffect, useRef, useCallback, Dispatch, SetStateAction } from "react";
import { Transition } from "@headlessui/react";
import Noise from "../components/Noise";
import { FaHeadphones } from "react-icons/fa";
import { Londrina_Shadow } from "next/font/google";
import { useColorPreset } from "../components/ColorPresetContext";
import Image from "next/image";

import { RiHome2Line } from "react-icons/ri";
import { FiClock } from "react-icons/fi";
import { MdOutlineFastfood } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
const ICON_SIZE = "w-6 h-6";

const londrinaShadow = Londrina_Shadow({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
});

export default function Start() {
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [showFinButton, setShowFinButton] = useState<boolean>(false);
  const [isFinishing, setIsFinishing] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const sections = [
    { id: 1, content: <Section1 setSoundEnabled={setSoundEnabled} setCurrentSection={setCurrentSection} /> },
    { id: 2, content: <Section2 /> },
    { id: 3, content: <Section3 /> },
    { id: 4, content: <Section4 /> },
    { id: 5, content: <Section5 /> },
  ];

  useEffect(() => {
    if (soundEnabled && currentSection > 1) {
      audioRef.current?.play();
    }

    setShowNextButton(false);
    setShowFinButton(false);

    const timer = setTimeout(() => {
      if (currentSection === 5) {
        setShowFinButton(true);
      } else {
        setShowNextButton(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [soundEnabled, currentSection]);

  const handleNext = useCallback(() => {
    setShowNextButton(false);
    setTimeout(() => {
      if (currentSection < sections.length) {
        setCurrentSection(currentSection + 1);
      }
    }, 500);
  }, [currentSection, sections.length]);

  const handleFin = useCallback(() => {
    setIsFinishing(true);
    fadeOutAudio();
    setTimeout(() => {
      window.location.href = "/";
    }, 2000); // 2 seconds delay before navigating home
  }, []);

  const fadeOutAudio = () => {
    if (audioRef.current) {
      let audio = audioRef.current;
      let fadeDuration = 2000; // 2 seconds
      let fadeInterval = 50; // 50ms intervals
      let fadeSteps = fadeDuration / fadeInterval;
      let fadeStep = audio.volume / fadeSteps;

      let fadeOutInterval = setInterval(() => {
        if (audio.volume > fadeStep) {
          audio.volume -= fadeStep;
        } else {
          clearInterval(fadeOutInterval);
          audio.pause();
          audio.volume = 1.0; // Reset volume for next play
        }
      }, fadeInterval);
    }
  };

  return (
    <>
      <StartBackground />
      <div className="w-screen h-svh fixed top-0 left-0 overflow-hidden z-[60]">
        {sections.map((section) => (
          <Transition
            key={section.id}
            show={currentSection === section.id}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="div"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              {section.content}
            </div>
          </Transition>
        ))}
        {currentSection !== 1 && currentSection !== 5 && (
          <Transition
            show={showNextButton}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="div"
            className="fixed bottom-4 right-4"
          >
            <button onClick={handleNext} className="p-2 text-xl">
              NEXT
            </button>
          </Transition>
        )}
        {currentSection === 5 && (
          <Transition
            show={showFinButton}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="div"
            className="fixed bottom-4 right-4"
          >
            <button onClick={handleFin} className={`p-2 text-xl ${isFinishing ? "opacity-0 transition-opacity duration-500" : ""}`}>
              Fin
            </button>
          </Transition>
        )}
        <audio ref={audioRef} src="/music.mp3" loop style={{ display: "none" }} />
      </div>
    </>
  );
}

interface Section1Props {
  setSoundEnabled: Dispatch<SetStateAction<boolean>>;
  setCurrentSection: Dispatch<SetStateAction<number>>;
}

function Section1({ setSoundEnabled, setCurrentSection }: Section1Props) {
  const handleSoundOn = () => {
    setSoundEnabled(true);
    setCurrentSection(2);
  };

  const handleSoundOff = () => {
    setSoundEnabled(false);
    setCurrentSection(2);
  };

  return (
    <div className="w-10/12 mx-auto absolute inset-0 flex items-center justify-center transition-opacity duration-700">
      <div className="text-center z-10">
        <div className="flex justify-center pb-8">
          <FaHeadphones className="h-16 w-16" />
        </div>
        <div className="pb-3">
          <p className="text-xl">サウンドと共にお楽しみください</p>
        </div>
        <div className="pb-8">
          <p className="text-sm">USE HEADPHONES FOR BEST EXPERIENCE</p>
        </div>
        <button onClick={handleSoundOn} className="text-xl transition-opacity duration-700">
          SOUND ON<span aria-hidden="true">→</span>
        </button>
        <div className="py-3 flex items-center justify-center">
          <div className="flex-grow border-t border-black"></div>
          <span className="px-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-black"></div>
        </div>
        <button onClick={handleSoundOff} className="text-sm transition-opacity duration-700">
          SOUND OFF <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

function Section2() {
  const [showTopText, setShowTopText] = useState(false);
  const [showBottomText, setShowBottomText] = useState(false);

  useEffect(() => {
    setShowTopText(false);
    setShowBottomText(false);

    const topTextTimer = setTimeout(() => {
      setShowTopText(true);
    }, 500);

    const bottomTextTimer = setTimeout(() => {
      setShowBottomText(true);
    }, 1500);

    return () => {
      clearTimeout(topTextTimer);
      clearTimeout(bottomTextTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-auto h-svh w-full">
      <div className="absolute inset-0 flex items-center justify-center -z-10 floating">
        <Image src="/svg/globe.svg" alt="Background Image" width={500} height={500} className="w-11/12 h-auto max-w-xl opacity-40 transform" />
      </div>
      <div className="text-center">
        <Transition
          show={showBottomText}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as="div"
        >
          <div className="relative w-10/12 mx-auto max-w-xl">
            <div className="text-2xl">
              今年の立命祭のテーマは...
            </div>
            <div className="text-8xl pt-2">
              <div className={londrinaShadow.className}>
                Parallel World
              </div>
            </div>
            <h1 className="text-base pt-2">
              「Parallel World」は選択の連鎖が生む現実の多様性を探求します。無数の「もしも」が織りなす可能性の世界を、想像力で紡ぎ出し、存在の奥深さを体感する。私たちの選択が生み出す無限の世界線を、創造の翼で飛翔しましょう。
            </h1>
          </div>
        </Transition>
      </div>
    </div>
  );
}

function Section3() {
  const [showTopText, setShowTopText] = useState(false);
  const [showBottomText, setShowBottomText] = useState(false);

  useEffect(() => {
    setShowTopText(false);
    setShowBottomText(false);

    const topTextTimer = setTimeout(() => {
      setShowTopText(true);
    }, 500);

    const bottomTextTimer = setTimeout(() => {
      setShowBottomText(true);
    }, 1500);

    return () => {
      clearTimeout(topTextTimer);
      clearTimeout(bottomTextTimer);
    };
  }, []);

  const { colors } = useColorPreset();

  return (
    <div className="flex flex-col items-center justify-center my-auto h-svh w-full">
      <div className="text-center">
        <Transition
          show={showTopText}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as="div"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="text-center">
              <div>
                <h1 className="text-3xl relative left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10/12 max-w-xl">
                  Getting Started with Our Site
                  <p className="text-base pt-2">~ 特設サイトガイド ~</p>
                </h1>
                <div className="text-lg space-y-2 text-center">
                  <p>HOME : アクティブイベント一覧</p>
                  <p>TIME : 場所ごとのタイムライン</p>
                  <p>CLASS : 各クラス企画概要</p>
                  <p>FOOD : キッチンカー等概要</p>
                  <p>MENU : バスダイヤ等</p>
                </div>
                <div className="text-3xl py-4">↓</div>
              </div>
            </div>

            {/* Navigation Bar */}
            <div className="sticky-navbar bottom-[10lvh] fixed left-2 right-2 transform translate-x-0 w-auto max-w-xl mx-auto z-50 backdrop-filter backdrop-blur-sm shadow-md rounded-full flex justify-center items-center p-1.5 animate-bounce" style={{ backgroundColor: colors[2] }}>
              <div className="w-full flex justify-around">
                <div className="flex flex-col items-center">
                  <RiHome2Line className={ICON_SIZE} />
                  <span className="text-[10px]">HOME</span>
                </div>
                <div className="flex flex-col items-center">
                  <FiClock className={ICON_SIZE} />
                  <span className="text-[10px]">TIME</span>
                </div>
                <div className="flex flex-col items-center">
                  <MdOutlineFastfood className={ICON_SIZE} />
                  <span className="text-[10px]">FOOD</span>
                </div>
                <div className="flex flex-col items-center">
                  <BsPeople className={ICON_SIZE} />
                  <span className="text-[10px]">CLASS</span>
                </div>
                <div className="flex flex-col items-center">
                  <HiOutlineBars3BottomRight className={ICON_SIZE} />
                  <span className="text-[10px]">MENU</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

  );
}

function Section4() {
  const [showTopText, setShowTopText] = useState(false);
  const [showBottomText, setShowBottomText] = useState(false);

  useEffect(() => {
    setShowTopText(false);
    setShowBottomText(false);

    const topTextTimer = setTimeout(() => {
      setShowTopText(true);
    }, 500);

    const bottomTextTimer = setTimeout(() => {
      setShowBottomText(true);
    }, 1500);

    return () => {
      clearTimeout(topTextTimer);
      clearTimeout(bottomTextTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full relative my-auto">
      <div className="text-center">
        <Transition
          show={showTopText}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as="div"
        >
          <div className="p-4 w-10/12 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold">~ 来場者の皆様へ ~</h1>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">休憩所のご案内</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/30 backdrop-blur-lg backdrop-white rounded-2xl p-4">
                  <h3 className="text-lg font-bold">〇 飲食可</h3>
                  <ul className="list-disc list-inside">
                    <li>食堂(2F)</li>
                    <li>サブアリーナ(1F)</li>
                  </ul>
                </div>
                <div className="bg-white/30 backdrop-blur-lg backdrop-white rounded-2xl p-4">
                  <h3 className="text-lg font-bold">✕ 飲食不可</h3>
                  <ul className="list-disc list-inside">
                    <li>高スタ前(1F)</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p>昼食は、正面玄関前のキッチンカー、食堂をご利用ください。</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">自由観覧（一般公開時間）はお守りください。</h2>
              <ul className="list-disc list-inside text-center">
                <li>7/20 : 1日目 11:00 〜 15:30</li>
                <li>7/21 : 2日目 9:00 〜 13:30</li>
              </ul>
            </div>
            <div className="space-y-2 underline underline-offset-4 text-red-500">
              <p>一般来場者・保護者の方は、開祭式、閉祭式、有志発表をご観覧頂けません。</p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}

function Section5() {
  const [showTopText, setShowTopText] = useState(false);
  const [showBottomText, setShowBottomText] = useState(false);

  useEffect(() => {
    setShowTopText(false);
    setShowBottomText(false);

    const topTextTimer = setTimeout(() => {
      setShowTopText(true);
    }, 500);

    const bottomTextTimer = setTimeout(() => {
      setShowBottomText(true);
    }, 1500);

    return () => {
      clearTimeout(topTextTimer);
      clearTimeout(bottomTextTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full space-y-4 relative">
      <div className="text-center">
        <Transition
          show={showTopText}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as="div"
        >
          <p className="text-3xl">~ Website Credits ~</p>
          <div className="flex flex-col items-start space-y-2 mt-8">
            <div className="flex items-center space-x-1">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image src="/start/Ichiro.webp" alt="Icon" width={50} height={50} className="rounded-full" />
              </div>
              <span className="text-2xl">Ishikawa Ichiro</span>
              <span>(Creator)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image src="/start/Masaya.webp" alt="Icon" width={50} height={50} className="rounded-full" />
              </div>
              <span className="text-2xl">Ochiai Masaya</span>
              <span>(Data Manager)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image src="/start/Shido.webp" alt="Icon" width={50} height={50} className="rounded-full" />
              </div>
              <span className="text-2xl">Ito Shido</span>
              <span>(Special Thanks)</span>
            </div>
          </div>
          <div className="flex flex-col items-center text-center pt-8 space-y-4">
            <p className="text-xl">Constructed with</p>
            <div className="flex space-x-8">
              <div className="flex justify-center items-center" style={{ width: 100, height: 50 }}>
                <Image src="/start/Vercel.png" alt="Vercel Logo" layout="intrinsic" width={100} height={50} objectFit="contain" />
              </div>
              <div className="flex justify-center items-center" style={{ width: 100, height: 50 }}>
                <Image src="/start/nextjs.png" alt="Nextjs Logo" layout="intrinsic" width={150} height={50} objectFit="contain" />
              </div>
            </div>
            <div className="pt-8">
              <p className="text-xl">Music</p>
              <p className="text-lg">Studio Kolomna</p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}

const StartBackground = () => {
  const { colors } = useColorPreset();

  return (
    <>
      <div className='w-screen h-svh fixed top-0 left-0 z-50'>
        <div className='relative w-full h-full' style={{ backgroundColor: colors[0], filter: 'blur(50px)' }}>
          <section id='top' className='circle' style={{ background: `radial-gradient(circle, ${colors[1]} 0%, rgba(255,255,255,0) 100%)` }}></section>
          <section id='down' className='circle' style={{ background: `radial-gradient(circle, ${colors[1]} 0%, rgba(255,255,255,0) 100%)` }}></section>
          <section id='right' className='circle' style={{ background: `radial-gradient(circle, ${colors[1]} 0%, rgba(255,255,255,0) 100%)` }}></section>
          <section id='left' className='circle' style={{ background: `radial-gradient(circle, ${colors[1]} 0%, rgba(255,255,255,0) 100%)` }}></section>
        </div>
        <Noise />
        <div className='fixed top-0 left-0 w-full h-full z-20 flex justify-between'>
          <SideTypography position="left" text="RITSUMEIKAN KEISHO" />
          <SideTypography position="right" text="RITSUMEIKAN KEISHO" />
        </div>
      </div>
    </>
  );
};

type SideTypographyProps = {
  position: 'left' | 'right';
  text: string;
};

const SideTypography = ({ position, text }: SideTypographyProps) => (
  <div className={`flex flex-col justify-between items-center py-24 ${position === 'left' ? 'pl-2' : 'pr-2'} w-[30px]`}>
    {position === 'left' && (
      <>
        <SideDots />
        <VerticalLine />
        <span className='text-sm transform -rotate-90 my-16 whitespace-nowrap text-white'>{text}</span>
        <SideDots />
      </>
    )}
    {position === 'right' && (
      <>
        <span className='text-sm transform rotate-90 my-16 whitespace-nowrap text-white'>{text}</span>
        <SideDots />
        <VerticalLine />
        <SideDots />
      </>
    )}
  </div>
);

const SideDots = () => (
  <div className='flex flex-col items-center'>
    <div className='h-1.5 w-1.5 bg-white rounded-full mb-2'></div>
    <div className='h-1.5 w-1.5 bg-white rounded-full mb-2'></div>
    <div className='h-1.5 w-1.5 bg-white rounded-full'></div>
  </div>
);
const VerticalLine = () => <div className='h-32 w-[0.05rem] bg-white'></div>;