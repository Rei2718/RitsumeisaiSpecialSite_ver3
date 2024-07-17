"use client";

import { useColorPreset } from "./ColorPresetContext";
import { useEffect, useState } from "react";

const ColorPresetSelector = () => {
  const { setColors } = useColorPreset();
  const [deviceType, setDeviceType] = useState("default");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("iphone") || userAgent.includes("ipad") || userAgent.includes("mac")) {
      setDeviceType("apple");
    } else {
      setDeviceType("pc");
    }
  }, []);

  const handlePresetChange = (preset: number) => {
    switch (preset) {
      case 1:
        if (deviceType === "apple") {
          setColors(['#FFE4AD', '#92c6f0', '#B4DEF8', '#E2F3F3']);
        } else {
          setColors(['#FFF1D6', '#C7E6FA', '#B4DEF8', '#DEF8F8']);
        }
        break;
      case 2:
        if (deviceType === "apple") {
          setColors(['#FFE4AD', '#EA9AB2', '#F5CCCC', '#f6c8d8']);
        } else {
          setColors(['#FFE4AD', '#F0A8C0', '#F5CCCC', '#F9DCE6']);
        }
        break;
      case 3:
        if (deviceType === "apple") {
          setColors(['#FFE4AD', '#0BEAAB', '#A8F0D8', '#a6ebcf']);
        } else {
          setColors(['#FFE4AD', '#18F2C2', '#96EDD0', '#AAEEDF']);
        }
        break;
      default:
        if (deviceType === "apple") {
          setColors(['#FFE4AD', '#92c6f0', '#B4DEF8', '#E2F3F3']);
        } else {
          setColors(['#FFF1D6', '#C7E6FA', '#B4DEF8', '#DEF8F8']);
        }
    }
  };

  return (
    <div className="preset-selector flex flex-col items-center space-y-4 bg-dark text-xs text-white">
      <div className="flex space-x-4">
        <button 
          className="w-16 h-16 rounded-full transition duration-300 ease-in-out shadow-md bg-gradient-to-b from-white via-[#eae5c9] via-[2%] to-[#4ca9df] to-100%"
          onClick={() => handlePresetChange(1)}
        >
          コットンキャンディー
        </button>
        <button 
          className="w-16 h-16 rounded-full transition duration-300 ease-in-out shadow-md bg-gradient-to-b from-white via-[#faee9e] via-[2%] to-[#ff0078] to-100%"
          onClick={() => handlePresetChange(2)}
        >
          ストロベリーマフィン
        </button>
        <button 
          className="w-16 h-16 rounded-full transition duration-300 ease-in-out shadow-md bg-gradient-to-b from-white via-[#faee9e] via-[2%] to-[#579c51] to-100%"
          onClick={() => handlePresetChange(3)}
        >
          グリーンフォレスト
        </button>
      </div>
    </div>
  );
};

export default ColorPresetSelector;
