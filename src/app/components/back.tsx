"use client";

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { GoClockFill } from "react-icons/go";
import { MdFastfood, MdOutlineFastfood, MdClose } from "react-icons/md";
import { RiHome2Fill, RiHome2Line } from "react-icons/ri";
import { FiClock } from "react-icons/fi";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { BsPeople, BsFillPeopleFill } from "react-icons/bs";
import { useColorPreset } from './ColorPresetContext';
import Noise from './Noise';

const ICON_SIZE = 'w-6 h-6';

export default function Background() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>('');
  const [selectedIcon, setSelectedIcon] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setSelectedIcon(isMenuOpen ? '' : 'hamburger');
  };

  const handleLinkClick = (href: string) => {
    if (pathname !== href) {
      router.push(href);
    }
    setIsMenuOpen(false);
    setSelectedIcon(href);
  };

  const toggleSubMenu = (menu: string) => setActiveMenu(activeMenu === menu ? '' : menu);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);

  useEffect(() => {
    setSelectedIcon(pathname === '/details' ? '/class' : pathname);
  }, [pathname]);

  const isSpecialPage = () => ['/class', '/time', '/food', '/jhs/j2', '/jhs/j1', '/jhs/j3'].includes(pathname);

  return (
    <>
      <KeyVisual />
      <StickyNavbar 
        toggleMenu={toggleMenu} 
        handleLinkClick={handleLinkClick} 
        selectedIcon={selectedIcon} 
        isSpecialPage={isSpecialPage} 
        setSelectedIcon={setSelectedIcon} 
      />
      <FullscreenMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        handleLinkClick={handleLinkClick}
        activeMenu={activeMenu}
        toggleSubMenu={toggleSubMenu}
        setSelectedIcon={setSelectedIcon}
      />
    </>
  );
}

const KeyVisual = () => {
  const { colors } = useColorPreset();

  return (
    <>
      <div className='w-screen h-screen fixed top-0 left-0 z-0'>
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

type StickyNavbarProps = {
  toggleMenu: () => void;
  handleLinkClick: (href: string) => void;
  selectedIcon: string;
  isSpecialPage: () => boolean;
  setSelectedIcon: Dispatch<SetStateAction<string>>;
};

const StickyNavbar = ({ toggleMenu, handleLinkClick, selectedIcon, setSelectedIcon }: StickyNavbarProps) => {
  const { colors } = useColorPreset();

  return (
    <div className="sticky-navbar fixed bottom-2 left-2 right-2 transform translate-x-0 w-auto max-w-xl mx-auto z-50 backdrop-filter backdrop-blur-sm shadow-md rounded-full flex justify-center items-center p-1.5" style={{ backgroundColor: colors[2] }}>
      <nav className="w-full flex justify-around">
        <NavbarIcon onClick={() => { handleLinkClick('/'); setSelectedIcon('/'); }} selectedIcon={selectedIcon} iconPath='/'>
          {selectedIcon === '/' ? <RiHome2Fill className={ICON_SIZE} /> : <RiHome2Line className={ICON_SIZE} />}
          <span className="text-[10px]">HOME</span>
        </NavbarIcon>
        <NavbarIcon onClick={() => { handleLinkClick('/time'); setSelectedIcon('/time'); }} selectedIcon={selectedIcon} iconPath='/time'>
          {selectedIcon === '/time' ? <GoClockFill className={ICON_SIZE} /> : <FiClock className={ICON_SIZE} />}
          <span className="text-[10px]">TIME</span>
        </NavbarIcon>
        <NavbarIcon onClick={() => { handleLinkClick('/food'); setSelectedIcon('/food'); }} selectedIcon={selectedIcon} iconPath='/food'>
          {selectedIcon === '/food' ? <MdFastfood className={ICON_SIZE} /> : <MdOutlineFastfood className={ICON_SIZE} />}
          <span className="text-[10px]">FOOD</span>
        </NavbarIcon>
        <NavbarIcon onClick={() => { handleLinkClick('/class'); setSelectedIcon('/class'); }} selectedIcon={selectedIcon} iconPath='/class'>
          {selectedIcon === '/class' ? <BsFillPeopleFill className={ICON_SIZE} /> : <BsPeople className={ICON_SIZE} />}
          <span className="text-[10px]">CLASS</span>
        </NavbarIcon>
        <NavbarIcon onClick={toggleMenu} selectedIcon={selectedIcon} iconPath='hamburger'>
          <HiOutlineBars3BottomRight className={`${ICON_SIZE} ${selectedIcon === 'hamburger' ? 'text-[rgb(50,50,50)]' : 'text-[rgb(50,50,50)]'}`} />
          <span className="text-[10px]">MENU</span>
        </NavbarIcon>
      </nav>
    </div>
  );
};

type NavbarIconProps = {
  onClick: () => void;
  selectedIcon: string;
  iconPath: string;
  children: React.ReactNode;
};

const NavbarIcon = ({ onClick, selectedIcon, iconPath, children }: NavbarIconProps) => (
  <button onClick={onClick} className={`hover:text-[rgb(50,50,50)] transition duration-300 ease-in-out flex flex-col items-center ${selectedIcon === iconPath ? 'text-[rgb(50,50,50)]' : 'text-[rgb(50,50,50)]'}`}>
    {children}
  </button>
);

type FullscreenMenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  handleLinkClick: (href: string) => void;
  activeMenu: string;
  toggleSubMenu: (menu: string) => void;
  setSelectedIcon: Dispatch<SetStateAction<string>>;
};

const FullscreenMenu = ({ isOpen, toggleMenu, handleLinkClick, activeMenu, toggleSubMenu, setSelectedIcon }: FullscreenMenuProps) => {
  const { colors } = useColorPreset();

  return (
    <div className={`fixed inset-0 bg-opacity-80 backdrop-blur-md flex items-center justify-center z-[60] transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ backgroundColor: colors[0] }}>
      <button className="absolute top-2 right-2 text-3xl" onClick={() => { toggleMenu(); setSelectedIcon('hamburger'); }}>
        <MdClose />
      </button>
      <ul className="text-xl text-center">
        <MenuItem onClick={() => { handleLinkClick('/'); setSelectedIcon('/'); }}>トップ</MenuItem>
        <MenuItem onClick={() => { handleLinkClick('/time'); setSelectedIcon('/time'); }}>タイムテーブル</MenuItem>
        <MenuItem onClick={() => { handleLinkClick('/food'); setSelectedIcon('/food'); }}>フード</MenuItem>
        <MenuItem onClick={() => { handleLinkClick('/class'); setSelectedIcon('/class'); }}>クラス企画</MenuItem>
        <MenuItem onClick={() => { handleLinkClick('/map'); setSelectedIcon('/map'); }}>マップ</MenuItem>
      </ul>
    </div>
  );
};

type MenuItemProps = {
  onClick: () => void;
  children: React.ReactNode;
};

const MenuItem = ({ onClick, children }: MenuItemProps) => (
  <li className='py-1.5'><button onClick={onClick}>{children}</button></li>
);
