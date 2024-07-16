"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useMemo, useCallback } from 'react';
import Loading from '../loading';
import { FiClock, FiMapPin } from 'react-icons/fi';
import { IoArrowBackCircle } from 'react-icons/io5';
import { useColorPreset } from '../components/ColorPresetContext';
import Image from 'next/image';
import { useLists } from '../components/ListsContext';

const ClassDetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const { lists } = useLists();
  const { colors } = useColorPreset();

  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [randomItems, setRandomItems] = useState<any[]>([]);

  const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    if (id) {
      const filteredLists = lists.filter(item => item.id.startsWith('s') || item.id.startsWith('j'));
      const detail = filteredLists.find(item => item.id === id);
      setSelectedItem(detail || null);

      const shuffledItems = shuffleArray(filteredLists);
      setRandomItems(shuffledItems.slice(0, 6));
    } else {
      setSelectedItem(null);
    }
  }, [id, lists]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleThumbnailClick = useCallback((id: string) => {
    router.push(`?id=${id}`);
  }, [router]);

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
            <HeaderSection selectedItem={selectedItem} />
            {/* Time and Location Section */}
            <TimeLocationSection selectedItem={selectedItem} />
            {/* Description Section */}
            <DescriptionSection selectedItem={selectedItem} />
            {/* Caution Section */}
            <CautionSection />
          </div>

          {/* Thumbnails Section */}
          <ThumbnailsSection randomItems={randomItems} handleThumbnailClick={handleThumbnailClick} />
        </div>
      </div>
    </>
  );
};

const HeaderSection: React.FC<{ selectedItem: any }> = ({ selectedItem }) => (
  <div className="flex flex-col items-left">
    <div className="w-full text-left">
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
      <h1 className="text-2xl font-semibold mt-4">{selectedItem.title}</h1>
    </div>
    <div className="text-left py-2">
      <p className="text-lg">Presented by : {selectedItem.name}</p>
    </div>
  </div>
);

const TimeLocationSection: React.FC<{ selectedItem: any }> = ({ selectedItem }) => (
  <div className="text-left text-sm">
    <div className="flex justify-start space-x-4 pt-4">
      <div className="flex items-center">
        <FiClock className='w-5 h-5' />
        <p className="py-1 ml-2">DAY1 : {selectedItem.time1} ~</p>
      </div>
      <div className="flex items-center">
        <FiClock className='w-5 h-5' />
        <p className="py-1 ml-2">DAY2 : {selectedItem.time2} ~</p>
      </div>
    </div>
    <div className="flex justify-start items-center pt-2">
      <FiMapPin className='w-5 h-5' />
      <p className="py-1 ml-2">{selectedItem.location}</p>
    </div>
  </div>
);

const DescriptionSection: React.FC<{ selectedItem: any }> = ({ selectedItem }) => (
  <div>
    <h2 className="text-lg text-left pt-6 font-semibold">ABOUT</h2>
    <p className="text-left text-sm pt-2">
      {selectedItem.description}
    </p>
  </div>
);

const CautionSection: React.FC = () => (
  <div>
    <div className="text-lg text-left pt-4 font-semibold flex items-center">
      CAUTION
      <p className='text-xs ml-2'>(一般来場者の方へ)</p>
    </div>
    <p className="text-left pt-2 text-sm">
      自由観覧(一般公開時間)はお守りください
    </p>
    <div className="pt-1">
      <div className="flex items-center">
        <FiClock className='w-5 h-5' />
        <p className="py-1 ml-2">DAY1 : 11:00 ~ 15:30</p>
      </div>
      <div className="flex items-center">
        <FiClock className='w-5 h-5' />
        <p className="py-1 ml-2">DAY2 : 9:00 ~ 13:00</p>
      </div>
    </div>
  </div>
);

const ThumbnailsSection: React.FC<{ randomItems: any[], handleThumbnailClick: (id: string) => void }> = ({ randomItems, handleThumbnailClick }) => (
  <>
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
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm pt-2">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </>
);

export default ClassDetailsPage;
