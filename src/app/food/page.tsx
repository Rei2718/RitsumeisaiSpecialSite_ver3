"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLists } from '../components/ListsContext';

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Food: React.FC = () => {
  const { lists } = useLists();
  const [shuffledItems, setShuffledItems] = useState<any[]>([]);

  useEffect(() => {
    const filteredItems = lists.filter(item => item.id.startsWith('f'));
    setShuffledItems(shuffleArray(filteredItems));
  }, [lists]);

  return (
    <div className="relative z-10">
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0 text-center py-10">
          <h1 className="text-2xl text-center">キッチンカー</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 w-10/12 max-w-xl mx-auto pb-20">
          {shuffledItems.map((item) => (
            <Link key={item.id} href={`/FoodDetailes?id=${item.id}`}>
              <div className="bg-transparent rounded-lg w-11/12 mx-auto py-1 transition duration-300 ease-in-out cursor-pointer">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4 w-[50px] h-[50px] relative">
                    <Image
                      src={item.img}
                      alt={item.name}
                      layout="fill"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-grow pr-2">
                    <h2 className="text-sm font-semibold break-words">{item.name}</h2>
                    <p className="text-xs text-[rgb(50,50,50)]">{item.title}</p>
                  </div>
                  <div className="flex-shrink-0 text-center">
                    <h2 className="text-sm font-semibold">{item.time1}</h2>
                    <p className="text-sm text-blue-400">see more</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Food;
