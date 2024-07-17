"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '../loading';
import { FiClock, FiMapPin } from 'react-icons/fi';
import { IoArrowBackCircle } from 'react-icons/io5';
import { useColorPreset } from '../components/ColorPresetContext';
import Image from 'next/image';
import { Lists, ListItem, MenuItem } from '../components/FoodLists'; // Import Lists and ListItem

const FoodDetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);
  const [randomItems, setRandomItems] = useState<ListItem[]>([]);
  const router = useRouter();

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    if (id) {
      const fetchItem = () => {
        const filteredItems = Lists.filter(item => item.id.startsWith('f')); // Filter items with ids starting with 'f'
        const detail = filteredItems.find(item => item.id === id);
        setSelectedItem(detail || null);

        const shuffledItems = shuffleArray([...filteredItems]);
        const selectedItems = shuffledItems.slice(0, 6);
        setRandomItems(selectedItems);
      };
      fetchItem();
    } else {
      setSelectedItem(null);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleThumbnailClick = (id: string) => {
    router.push(`?id=${id}`);
  };

  const { colors } = useColorPreset();

  if (!selectedItem) {
    return <Loading />;
  }

  return (
    <>
      {/* Top Section */}
      <div className="relative h-lvh">
        <div className="fixed inset-0 z-10 brightness-50 h-lvh w-full">
          <Image
            src={selectedItem.img}
            alt={`${selectedItem.title} Background`}
            layout="fill"
            objectFit="cover"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Text Section */}
        <div className="relative min-h-screen top-[3rem] z-10" style={{ background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), ${colors[3]} 20rem)` }}>
          {/* Back Button */}
          <button 
            className="relative -top-[3rem] text-[rgb(172,172,172)] rounded m-3 flex items-center"
            onClick={() => router.back()}
          >
            <IoArrowBackCircle className="h-8 w-8" />
          </button>
          <div className='max-w-xl mx-auto w-11/12'>
            {/* Header Section */}
            <div className="flex flex-col items-left">
              <div className="w-full text-left">
                {/* Poster Section */}
                <div className="relative flex justify-center z-20 -top-[1rem]">
                  <div className='relative w-[70%] pb-[98.7%]'>
                    <Image
                      src={selectedItem.img}
                      alt={`${selectedItem.title} Poster`}
                      layout="fill"
                      objectFit="cover"
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-lg"
                    />
                  </div>
                </div>
                <h1 className="text-2xl font-semibold mt-4">{selectedItem.store}</h1>
              </div>
              <div className="text-left py-2">
                <p className="text-lg">{selectedItem.title}</p>
                <p className="text-base text-sky-400">
                  <a href={selectedItem.location} className="underline">
                    {selectedItem.location}
                  </a>
                </p>
              </div>
            </div>
            {/* Description Section */}
            <div>
              <h2 className="text-lg text-left pt-6 font-semibold">ABOUT</h2>
              <p className="text-left text-sm pt-2">
                {selectedItem.description}
              </p>
            </div>
            {/* Menu Section */}
            <div>
              <h2 className="text-lg text-left pt-6 font-semibold">MENU</h2>
              <div className="text-left text-sm pt-2">
                {selectedItem.menus.map((menu: MenuItem, index: number) => (
                  <div key={index} className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-[50px] h-[50px] relative">
                        <Image
                          src={menu.img}
                          alt={menu.name}
                          layout="fill"
                          className="rounded-full object-cover"
                        />
                      </div>
                      <p className="font-semibold">{menu.name}</p>
                    </div>
                    <p className="text-right">{menu.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Thumbnails Section */}
          <div className="flex justify-start text-center py-6 w-11/12 mx-auto">
            <h2 className="text-lg font-semibold">DISCOVER</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-20 w-11/12 mx-auto">
            {randomItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => handleThumbnailClick(item.id)}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={item.img}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="object-cover w-full h-full rounded-t-xl"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{item.store}</h3>
                  <p className="text-sm pt-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodDetailsPage;
