"use client";

import { useState, useEffect, useRef, useCallback, Dispatch, SetStateAction } from "react";
import { Transition } from "@headlessui/react";
import Noise from "../components/Noise";
import { FaHeadphones } from "react-icons/fa";
import { Londrina_Shadow } from "next/font/google";
import { useColorPreset } from "../components/ColorPresetContext";

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
      <StartBackground/>
      <div className="w-screen h-screen fixed top-0 left-0 overflow-hidden z-[60]">
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
    <div className="flex flex-col items-center justify-center h-full w-full">
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
          <h1 className="text-3xl absolute top-[25vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10/12 max-w-xl">
            This years theme is...
          </h1>
        </Transition>
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
          <h1 className="text-8xl absolute top-[50vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10/12 max-w-xl">
            <div className={londrinaShadow.className}>
              Parallel World
            </div>
          </h1>
        </Transition>
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
          <h1 className="text-sm absolute top-[75vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10/12 max-w-xl">
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
          <h1 className="text-3xl py-4">写真とか</h1>
          <h1 className="text-3xl py-4">菊地 賢司</h1>
          <div className="text-sm max-w-xl py-4">
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
    <div className="flex flex-col items-center justify-center h-full w-full space-y-4 relative">
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
          <h1 className="text-3xl py-4">写真とか</h1>
          <h1 className="text-3xl py-4">菊地 賢司</h1>
          <div className="text-sm max-w-xl py-4">
            お互いの違い、個性、そしてそれぞれの多様性を尊重し、認め合える場所、そんな唯一無二の学校である立命館慶祥で、一緒に「世界に通用する18歳」を目指しましょう。
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
    <div className="flex flex-col items-center justify-center h-full w-full space-y-4 relative">
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
          <h1 className="text-3xl py-4">写真とか</h1>
          <h1 className="text-3xl py-4">菊地 賢司</h1>
          <div className="text-sm max-w-xl py-4">
            お互いの違い、個性、そしてそれぞれの多様性を尊重し、認め合える場所、そんな唯一無二の学校である立命館慶祥で、一緒に「世界に通用する18歳」を目指しましょう。
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
      <div className='w-screen h-screen fixed top-0 left-0 z-[50]'>
        <div className='' style={{ backgroundColor: colors[0], filter: 'blur(100px)' }}>
          <section id='top' className='left-0 h-[80vh] w-[80vh] rounded-full fixed' style={{ background: colors[1], filter: 'blur(110px)' }}></section>
          <section id='down' className='fixed h-[70vh] w-[70vh] rounded-full' style={{ background: colors[1], filter: 'blur(110px)' }}></section>
          <section id='right' className='right-0 fixed h-[60vh] w-[60vh] rounded-full' style={{ background: colors[1], filter: 'blur(110px)' }}></section>
          <section id='left' className='fixed left-0 bottom-0 h-[70vh] w-[70vh] rounded-full' style={{ background: colors[1], filter: 'blur(110px)' }}></section>
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

type StickyNavbarProps = {
  toggleMenu: () => void;
  handleLinkClick: (href: string) => void;
  selectedIcon: string;
  isSpecialPage: () => boolean;
  setSelectedIcon: Dispatch<SetStateAction<string>>;
};