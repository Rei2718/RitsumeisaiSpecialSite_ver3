"use client";

import React, { useState, useEffect } from 'react';
import { useLists } from './ListsContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 変更点

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
  const router = useRouter(); // 変更点

  // 1分ごとに現在の日時を更新
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // time1を現在の日付に合わせてDateオブジェクトに変換
  const convertToFullDate = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const fullDate = new Date(currentTime);
    fullDate.setHours(hours);
    fullDate.setMinutes(minutes);
    fullDate.setSeconds(0);
    fullDate.setMilliseconds(0);
    return fullDate;
  };

  // イベントを時間順にソート
  const sortedEvents = lists.sort((a, b) => convertToFullDate(a.time1).getTime() - convertToFullDate(b.time1).getTime());

  // 現在アクティブなイベントをフィルタリング
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
      <>
        <div className="w-10/12 mx-auto max-w-md pt-4">
          <div className="bg-white/30 backdrop-blur-lg backdrop-white rounded-2xl p-2 text-center">
            <p className='text-center text-lg'>
              <span className='inline-block transform -rotate-45 animate-pingHalf'>!!</span> Active Event <span className='inline-block transform rotate-45 animate-pingHalf'>!!</span>
            </p>
            <div>No active events at this time.</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='w-4/5 py-5 mx-auto max-w-md'>
      <div className="bg-white/30 backdrop-blur-lg backdrop-white rounded-2xl">
        <p className='text-center text-lg pt-2'>
          <span className='inline-block transform -rotate-45 animate-pingHalf'>!!</span> Active Event <span className='inline-block transform rotate-45 animate-pingHalf'>!!</span>
        </p>

        {/* 前日に消す。下の要素のBlurも忘れずに */}
        <div className='flex items-center justify-center animate-pulse text-xs'>注 : 立命祭は20,21日開催です</div>

        <div className={`grid gap-1 pt-2 px-2 ${activeEventList.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {activeEventList.map(event => (
            <div key={event.id} className="w-full mx-auto py-2 flex items-center justify-center animate-pulse" onClick={() => router.push('/time')}> {/* 変更点 */}
              <div className="flex gap-x-2 relative group rounded-lg">
                <div className="flex items-center justify-center">
                  <Link href="/Class">
                    <button type="button" className="text-left relative z-10 inline-flex items-center gap-x-1 text-xs rounded-lg border border-transparent font-semibold">
                      <div className="flex-shrink-0 w-[30px] h-[30px] relative">
                        <Image
                          src={event.img}
                          alt={event.name}
                          layout="fill"
                          className="object-cover flex-shrink-0 size-3 rounded-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-[10px]">{event.title}</p>
                        <div className="flex items-center space-x-1">
                          <p className="text-[10px]">{event.time1}~</p>
                          <p className="text-[10px]">@{event.location}</p>
                        </div>
                      </div>
                    </button>
                  </Link>
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
