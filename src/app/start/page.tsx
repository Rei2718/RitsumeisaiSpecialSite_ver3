"use client";

import { useState, useEffect, useRef, useCallback, Dispatch, SetStateAction } from "react";
import { Transition } from "@headlessui/react";
import Noise from "../components/Noise";
import { FaHeadphones } from "react-icons/fa";
import { Londrina_Shadow } from "next/font/google";

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
    <div className="w-screen h-screen fixed top-0 left-0 overflow-hidden z-[60]">
      <StartBackground />
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
          <button onClick={handleNext} className="p-2">
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
          <button onClick={handleFin} className={`p-2 ${isFinishing ? "opacity-0 transition-opacity duration-500" : ""}`}>
            Fin
          </button>
        </Transition>
      )}
      <audio ref={audioRef} src="/music.mp3" loop style={{ display: "none" }} />
    </div>
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
    <div className="flex flex-col items-center justify-center h-full w-full space-y-4 relative">
      <div className="w-10/12 text-center">
        <Transition
          show={showTopText}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <h1 className="text-3xl">This year&apos;s theme is...</h1>
        </Transition>
      </div>
      <div className="w-10/12 text-center">
        <Transition
          show={showBottomText}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <h1 className="text-8xl">
            <div className={londrinaShadow.className}>
              Parallel World
            </div>
          </h1>
        </Transition>
      </div>
      <div className="w-10/12 text-center">
        <Transition
          show={showBottomText}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <h1 className="text-sm">
            「Parallel World」は選択の連鎖が生む現実の多様性を探求します。無数の「もしも」が織りなす可能性の世界を、想像力で紡ぎ出し、存在の奥深さを体感する。私たちの選択が生み出す無限の世界線を、創造の翼で飛翔しましょう。
          </h1>
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

  return (
    <div className="flex flex-col items-center justify-center h-full w-full space-y-4 relative">
      <div className="w-10/12 text-center">
        <Transition
          show={showTopText}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <h1 className="text-3xl">菊地 賢司</h1>
        </Transition>
      </div>
      <div className="w-10/12 text-center">
        <Transition
          show={showBottomText}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="text-sm">
            お互いの違い、個性、そしてそれぞれの多様性を尊重し、認め合える場所、そんな唯一無二の学校である立命館慶祥で、一緒に「世界に通用する18歳」を目指しましょう。
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
    <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
      <Transition
        show={showTopText}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <h1 className="text-3xl absolute top-[17rem]">注意事項等</h1>
      </Transition>
      <Transition 
        show={showBottomText}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <h1 className="text-3xl absolute">Here is Section4</h1>
      </Transition>
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
    <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
      <Transition
        show={showTopText}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <h1 className="text-3xl absolute top-[17rem]">制作クレジット</h1>
      </Transition>
      <Transition
        show={showBottomText}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <h1 className="text-3xl absolute">Here is Section5</h1>
      </Transition>
    </div>
  );
}

function StartBackground() {
  return (
    <>
      <div className='w-screen h-screen fixed top-0 left-0 z-0 bg-[#eae5c9]'>
        <section id='top' className='left-0 h-[70vh] w-[70vh] rounded-full fixed bg-gradient-to-r from-[#eae5c9] to-[#4ca9df] blur-[100px]'></section>
        <section id='down' className='fixed h-[40vh] w-[40vh] rounded-full bg-gradient-to-r from-[#eae5c9] to-[#4ca9df] blur-[100px]'></section>
        <section id='right' className='right-0 fixed h-[50vh] w-[50vh] rounded-full bg-gradient-to-b from-[#4ca9df] to-[#eae5c9] blur-[100px]'></section>
        <section id='left' className='fixed left-0 bottom-0 h-[60vh] w-[60vh] rounded-full bg-gradient-to-b from-[#4ca9df] to-[#eae5c9] blur-[100px]'></section>
        <Noise />
      </div>
    </>
  );
}
