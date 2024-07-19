"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useLists } from './ListsContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

interface EventItem {
  id: string;
  name: string;
  title: string;
  time1: string;
  location: string;
  img: string;
  description: string;
}

const ActiveEventsList: React.FC = () => {
  const { lists } = useLists();
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();

  // Update current time every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Convert time1 to a Date object based on current date
  const convertToFullDate = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const fullDate = new Date(currentTime);
    fullDate.setHours(hours);
    fullDate.setMinutes(minutes);
    fullDate.setSeconds(0);
    fullDate.setMilliseconds(0);
    return fullDate;
  };

  // Sort events by time1
  const sortedEvents = useMemo(() => {
    return lists.sort((a, b) => convertToFullDate(a.time1).getTime() - convertToFullDate(b.time1).getTime());
  }, [lists, currentTime]);

  // Filter active events based on the current time
  const activeEvents: { [key: string]: EventItem } = {};

  for (const event of sortedEvents) {
    const eventStartTime = convertToFullDate(event.time1);
    if (eventStartTime <= currentTime) {
      activeEvents[event.location] = event;
    }
  }

  const activeEventList = Object.values(activeEvents);

  if (activeEventList.length === 0) {
    return (
      <div className="w-10/12 mx-auto max-w-md pt-4">
        <div className="bg-white/30 backdrop-blur-lg backdrop-white rounded-2xl p-2 text-center">
          <p className='text-center text-lg'>
            <span className='inline-block transform -rotate-45 animate-pingHalf'>!!</span> Current Events <span className='inline-block transform rotate-45 animate-pingHalf'>!!</span>
          </p>
          <div>No active events at this time.</div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-4/5 py-5 mx-auto max-w-md'>
      <div className="bg-white/30 backdrop-blur-lg backdrop-white rounded-2xl">
        <p className='text-center text-lg pt-2'>
          <span className='inline-block transform -rotate-45 animate-pingHalf'>!!</span> Current Events <span className='inline-block transform rotate-45 animate-pingHalf'>!!</span>
        </p>
  
        {/* Remove before the event day */}
        <div className='flex items-center justify-center animate-pulse text-xs'>注 : 立命祭は20,21日開催です</div>
  
        <div className={`grid gap-1 pt-2 px-2 ${activeEventList.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {activeEventList.map((activeItem) => (
            <div key={activeItem.id} className="w-full mx-auto p-2 flex items-start justify-start animate-pulse">
              <div className="flex gap-x-2 relative group rounded-lg justify-start">
                <div className="flex items-center justify-center">
                  <button type="button" className="text-left relative z-10 inline-flex items-center gap-x-1 text-xs rounded-lg border border-transparent" onClick={() => router.push(`/EventDetails?id=${activeItem.id}`)}>
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
    </div>
  );  
};

export default ActiveEventsList;
