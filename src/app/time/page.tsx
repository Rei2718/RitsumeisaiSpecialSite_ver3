"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useColorPreset } from '../components/ColorPresetContext';
import { useLists } from '../components/ListsContext';

// Function to get color based on grade
const getColorByGrade = (id: string) => {
  if (id.startsWith('j1')) return 'bg-green-200';
  if (id.startsWith('j2')) return 'bg-yellow-100';
  if (id.startsWith('j3')) return 'bg-red-200';
  if (id.startsWith('s1')) return 'bg-purple-200';
  if (id.startsWith('s2')) return 'bg-sky-200';
  if (id.startsWith('s3')) return 'bg-orange-200';
  return 'bg-gray-200';
};

const locationMap: { [key: string]: string } = {
  'Arena': 'アリーナ',
  'Co-Tan': 'コタン',
  'Atrium': 'アトリウム',
  'Assembly': 'アセンブリー',
};

// Tab Component
const Tab: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button
    className={`relative my-1 transition-colors duration-300 ${isActive ? 'font-bold animate-bounce' : ''}`}
    onClick={onClick}
  >
    {label}
  </button>
);

// ActiveEvent Component
const ActiveEvent: React.FC<{ activeEvents: any[] }> = ({ activeEvents }) => {
  if (activeEvents.length === 0)
    return (
      <div className="w-10/12 mx-auto max-w-md pb-8">
        <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-2 text-center">
          <p className='text-center text-lg pt-2'>
            <span className='inline-block transform -rotate-45 animate-pingHalf'>!!</span> Current Event <span className='inline-block transform rotate-45 animate-pingHalf'>!!</span>
          </p>
          <div className='text-xs'>現在アクティブなイベントはありません。</div>
        </div>
      </div>
    );

  return (
    <div className="w-10/12 mx-auto max-w-md pb-8">
      <div className="bg-white/30 backdrop-blur-lg rounded-2xl">
        <p className='text-center text-lg pt-2'>
          <span className='inline-block transform -rotate-45 animate-pingHalf'>!!</span> Current Event <span className='inline-block transform rotate-45 animate-pingHalf'>!!</span>
        </p>
        {activeEvents.map((activeItem) => (
          <div key={activeItem.id} className="w-full mx-auto p-2 flex items-center justify-center animate-pulse">
            <div className="flex gap-x-2 relative group rounded-lg justify-center">
              <div className="flex items-center justify-center">
                <button type="button" className="text-left relative z-10 inline-flex items-center gap-x-1 text-xs rounded-lg border border-transparent">
                  <div className="flex-shrink-0 pr-2 w-[30px] h-[30px] relative">
                    <Image
                      src={activeItem.img}
                      alt={activeItem.name}
                      layout="fill"
                      className="object-cover flex-shrink-0 size-3 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <div><span className={`${getColorByGrade(activeItem.id)} rounded-md px-2 mr-2 pb-0.5 w-10 text-center`}>{activeItem.name}</span>{activeItem.title}</div>
                    <div className="flex items-center space-x-1">
                      <p className="text-xs">{activeItem.time1}~</p>
                      <p className="text-xs">@{locationMap[activeItem.location]}</p>
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

// ItemList Component
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
          <div key={item.id} className={`flex gap-x-3 relative group rounded-xl p-2 justify-center ${isActiveItem(item.time1, nextItemTime) ? 'bg-gradient-to-r from-yellow-100 via-yellow-50 via-[70%] to-transparent to-[99%] animate-pulse' : ''}`}>
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
                <div>
                  <div><span className={`${getColorByGrade(item.id)} rounded-md px-2 mr-2 pb-0.5 w-10 text-center`}>{item.name}</span>{item.title}</div>
                </div>
              </button>
              <p className="mt-1 text-xs">{item.description}</p>
              <p className="mt-1 text-xs">@{locationMap[item.location]}</p>
              {!item.id.startsWith('p') && <p className="text-sm text-blue-400">see more</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// TabContents Component
const TabContents: React.FC<{ activeTab: string; items: any[]; currentTime: Date }> = ({ activeTab, items, currentTime }) => {
  const filteredItems = useMemo(() => items.filter(item => item.location === activeTab && item.time1 && !item.id.startsWith('f')), [activeTab, items]);

  return (
    <div className="pt-20">
      <ItemList items={filteredItems} currentTime={currentTime} />
    </div>
  );
};

// Time1 Component
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
            <div key={tab.id} className="mx-1 my-0.5">
              <Tab
                label={locationMap[tab.label]}
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
