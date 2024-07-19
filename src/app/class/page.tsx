"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useColorPreset } from '../components/ColorPresetContext';
import { useLists } from '../components/ListsContext';

const Tab: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
  <button
    className={`relative my-1 transition-colors duration-300 ${isActive ? 'font-bold animate-bounce' : ''}`}
    onClick={onClick}
  >
    {label}
  </button>
);

const ClassList: React.FC<{ items: any[] }> = ({ items }) => (
  <div className="flex justify-center items-center">
    <div className="grid grid-cols-1 gap-4 w-10/12 max-w-xl mx-auto">
      {items.map(item => (
        <Link key={item.id} href={`/ClassDetails?id=${item.id}`}>
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
              <div className="flex-grow">
                <h2 className="text-sm font-semibold break-words">{item.name}</h2>
                <p className="text-xs pr-2 ">{item.title}</p>
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
);

const TabContents: React.FC<{ activeTab: string; items: any[] }> = ({ activeTab, items }) => {
  const filteredItems = useMemo(() => items.filter(item => {
    if (activeTab === 'JuniorHigh') return item.id.startsWith('j');
    if (activeTab === 'SeniorHigh') return item.id.startsWith('s');
    return item.id.startsWith('o');
  }), [activeTab, items]);

  const sections = useMemo(() => {
    if (activeTab === 'JuniorHigh') {
      return [
        { id: '1', title: '一年生', subtitle: '~ プレゼンテーション ~', prefix: '1' },
        { id: '2', title: '二年生', subtitle: '~ よさこい ~', prefix: '2' },
        { id: '3', title: '三年生', subtitle: '~ 演劇 ~', prefix: '3' }
      ];
    }
    if (activeTab === 'SeniorHigh') {
      return [
        { id: '1', title: '一年生', subtitle: '~ クラス展示 ~', prefix: '1' },
        { id: '2', title: '二年生', subtitle: '~ Atrium ・Co-Tan 発表 ~', prefix: '2' },
        { id: '3', title: '三年生', subtitle: '~ Arena 発表 ~', prefix: '3' }
      ];
    }
    return [
      { id: '1', title: 'その他', subtitle: '', prefix: '' }
    ];
  }, [activeTab]);

  return (
    <>
      {sections.map(({ id, title, subtitle, prefix }) => (
        <React.Fragment key={id}>
          <div className="flex-shrink-0 text-center py-10">
            <h1 className="text-2xl py-2 text-center">{activeTab === 'JuniorHigh' ? `中学${title}` : activeTab === 'SeniorHigh' ? `高校${title}` : `${title}`}</h1>
            <p className="text-base">{subtitle}</p>
          </div>
          <ClassList items={filteredItems.filter(item => item.id.startsWith(activeTab === 'Others' ? `o${prefix}` : `${activeTab.charAt(0).toLowerCase()}${prefix}`))} />
        </React.Fragment>
      ))}
    </>
  );
};

const Class: React.FC = () => {
  const { colors } = useColorPreset();
  const { lists: items } = useLists();
  const [activeTab, setActiveTab] = useState('SeniorHigh');

  const tabs = [
    { id: 'SeniorHigh', label: '高校企画' },
    { id: 'JuniorHigh', label: '中学企画' },
    { id: 'Others', label: 'その他' }
  ];

  return (
    <>
      <nav className="sticky-navbar fixed top-2 left-2 right-2 transform translate-x-0 w-auto max-w-xl mx-auto z-50 backdrop-filter backdrop-blur-sm shadow-md rounded-full flex justify-center items-center p-1" style={{ backgroundColor: colors[2] }}>
        <div className="flex justify-between w-full">
          {tabs.map(tab => (
            <div key={tab.id} className="flex-grow text-center">
              <Tab
                label={tab.label}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            </div>
          ))}
        </div>
      </nav>
      <div className="relative z-10 pb-20 pt-10">
        <TabContents activeTab={activeTab} items={items} />
      </div>
    </>
  );
};

export default Class;
