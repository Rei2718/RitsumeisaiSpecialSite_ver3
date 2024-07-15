"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useColorPreset } from '../components/ColorPresetContext';
import { useLists } from '../components/ListsContext';

const Tab: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button
    className={`relative my-1 transition-colors duration-300 ${isActive ? 'font-bold' : ''}`}
    onClick={onClick}
  >
    {label}
  </button>
);

const ActiveEvent: React.FC<{ activeEvents: any[] }> = ({ activeEvents }) => {
  if (activeEvents.length === 0) 
    return(
      <>
        <div className="w-10/12 mx-auto max-w-md pb-8">
          <div className="bg-white/30 backdrop-blur-lg backdrop-white rounded-2xl p-2 text-center">
            <p className='text-center text-lg pt-2'>
              <span className='inline-block transform -rotate-45 animate-pingHalf'>!!</span> Active Event <span className='inline-block transform rotate-45 animate-pingHalf'>!!</span>
            </p>
            <div>No active events at this time.</div>
          </div>
        </div>
      </>
    );

  return (
    <div className="w-10/12 mx-auto max-w-md pb-8">
      <div className="bg-white/30 backdrop-blur-lg backdrop-white rounded-2xl">
        <p className='text-center text-lg pt-2'>
          <span className='inline-block transform -rotate-45 animate-pingHalf'>!!</span> Active Event <span className='inline-block transform rotate-45 animate-pingHalf'>!!</span>
        </p>

        {/* 前日に消す。下の要素のBlurも忘れずに */}
        <div className='flex items-center justify-center animate-pulse'>CommingSoon...</div>
        
        {activeEvents.map((activeItem) => (
          <div key={activeItem.id} className="w-full mx-auto p-2 flex items-center justify-center animate-pulse blur-sm">
            <div className="flex gap-x-2 relative group rounded-lg justify-center">
              <div className="flex items-center justify-center">
                <button type="button" className="text-left relative z-10 inline-flex items-center gap-x-1 text-xs rounded-lg border border-transparent font-semibold">
                  <div className="flex-shrink-0 pr-2 w-[30px] h-[30px] relative">
                    <Image
                      src={activeItem.img}
                      alt={activeItem.name}
                      layout="fill"
                      className="object-cover flex-shrink-0 size-3 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <p className="text-sm">{activeItem.title}</p>
                    <div className="flex items-center space-x-1">
                      <p className="text-xs">{activeItem.time1}~</p>
                      <p className="text-xs">@{activeItem.location}</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ItemList: React.FC<{ items: any[]; currentTime: Date }> = ({ items, currentTime }) => {
  const convertToFullDate = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const fullDate = new Date(currentTime);
    fullDate.setHours(hours);
    fullDate.setMinutes(minutes);
    fullDate.setSeconds(0);
    fullDate.setMilliseconds(0);
    return fullDate;
  };

  const sortedItems = useMemo(() => items.filter(item => item.time1).sort((a, b) => a.time1.localeCompare(b.time1)), [items]);

  const generateLinkHref = (item: any) => {
    if (item.id.startsWith('j') || item.id.startsWith('s')) {
      return `/ClassDetails?id=${item.id}`;
    }
    return '';
  };

  const isActiveItem = (itemTime: string, nextItemTime?: string) => {
    const itemDate = convertToFullDate(itemTime);
    const nextItemDate = nextItemTime ? convertToFullDate(nextItemTime) : new Date(itemDate.getTime() + 60 * 60 * 1000);

    return currentTime >= itemDate && currentTime < nextItemDate;
  };

  const activeEvents = useMemo(() => {
    const activeEventsMap: { [key: string]: any } = {};

    sortedItems.forEach(event => {
      const eventStartTime = convertToFullDate(event.time1);
      if (eventStartTime <= currentTime) {
        activeEventsMap[event.location] = event;
      }
    });

    return Object.values(activeEventsMap);
  }, [sortedItems, currentTime, convertToFullDate]);

  return (
    <div className="w-10/12 max-w-xl mx-auto">
      <ActiveEvent activeEvents={activeEvents} />
      {sortedItems.map((item, index) => {
        const linkHref = generateLinkHref(item);
        const nextItemTime = sortedItems[index + 1]?.time1;
        
        return (
          <div key={item.id} className={`flex gap-x-3 relative group rounded-xl p-2 justify-center ${isActiveItem(item.time1, nextItemTime) ? 'bg-gradient-to-r from-yellow-100  via-yellow-50 via-[70%] to-transparent to-[99%] animate-pulse' : ''}`}>
            {!item.id.startsWith('p') && linkHref && <Link href={linkHref} className="absolute inset-0 z-[1]" />}
            <div className="relative flex flex-col items-center">
              <div className="text-sm pb-1 pt-2.5">{item.time1}</div>
              <div className="flex-grow w-px bg-[rgb(100,100,100)]"></div>
            </div>
            <div className="grow pb-8">
              <button type="button" className="text-left relative z-10 inline-flex items-center gap-x-2 text-sm rounded-lg border border-transparent font-semibold">
                <div className="flex-shrink-0 mr-1 w-[40px] h-[40px] relative">
                  <Image
                    src={item.img}
                    alt={item.name}
                    layout="fill"
                    className="object-cover flex-shrink-0 size-4 rounded-full"
                  />
                </div>
                {item.title}
              </button>
              <p className="mt-1 text-xs">{item.description}</p>
              {!item.id.startsWith('p') && <p className="text-sm text-blue-400">see more</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TabContents: React.FC<{ activeTab: string; items: any[]; currentTime: Date }> = ({ activeTab, items, currentTime }) => {
  const filteredItems = useMemo(() => items.filter(item => item.location === activeTab && item.time1 && !item.id.startsWith('f')), [activeTab, items]);

  return (
    <div className="pt-20">
      <ItemList items={filteredItems} currentTime={currentTime} />
    </div>
  );
};

const Time1: React.FC = () => {
  const { colors } = useColorPreset();
  const { lists } = useLists();
  const [activeTab, setActiveTab] = useState<string>('Arena');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const updateCurrentTime = () => setCurrentTime(new Date());

    const intervalId = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const validLocations = useMemo(() => ['Arena', 'Co-Tan', 'Atrium', 'Assembly'], []);

  const filteredItems = useMemo(() => lists.filter(item => validLocations.includes(item.location)), [lists, validLocations]);

  const tabs = useMemo(() => validLocations.map(location => ({ id: location, label: location })), [validLocations]);

  return (
    <>
      <nav className="sticky-navbar fixed top-2 left-2 right-2 transform translate-x-0 w-auto max-w-xl mx-auto z-50 backdrop-filter backdrop-blur-sm shadow-md rounded-full flex justify-center items-center p-1" style={{ backgroundColor: colors[2] }}>
        <div className="flex justify-center">
          {tabs.map((tab) => (
            <div key={tab.id} className="mx-5">
              <Tab
                label={tab.label}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            </div>
          ))}
        </div>
      </nav>
      <div className="relative z-10 pb-20">
        <TabContents activeTab={activeTab} items={filteredItems} currentTime={currentTime} />
      </div>
    </>
  );
};

export default Time1;
