"use client";

import { useColorPreset } from "./ColorPresetContext";
import { useEffect, useState } from "react";

const ColorPresetSelector = () => {
  const { setColors } = useColorPreset();
  const [deviceType, setDeviceType] = useState("default");
  const [presetIndex, setPresetIndex] = useState(0);
  const [buttonColor, setButtonColor] = useState("");
  const [buttonText, setButtonText] = useState("Blue");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("iphone") || userAgent.includes("ipad") || userAgent.includes("mac")) {
      setDeviceType("apple");
    } else {
      setDeviceType("pc");
    }
  }, []);

  const presets = [
    {
      apple: ['#FFE4AD', '#92c6f0', '#B4DEF8', '#bde4e4'],
      pc: ['#FFF1D6', '#C7E6FA', '#B4DEF8', '#CDF4F4'],
      text: 'Blue'
    },
    {
      apple: ['#FFE4AD', '#EA9AB2', '#F5CCCC', '#f6c8d8'],
      pc: ['#FFF1D6', '#F0A8C0', '#F5CCCC', '#F9DCE6'],
      text: 'Red'
    },
    {
      apple: ['#FFE4AD', '#0BEAAB', '#A8F0D8', '#a6ebcf'],
      pc: ['#FFF1D6', '#18F2C2', '#96EDD0', '#AAEEDF'],
      text: 'Green'
    }
  ];

  const setDefaultColors = () => {
    const defaultPreset = presets[0];
    const colors = deviceType === "apple" ? defaultPreset.apple : defaultPreset.pc;
    setColors(colors);
    setButtonColor(colors[1]);
    setButtonText(defaultPreset.text);
  };

  useEffect(() => {
    setDefaultColors();
  }, [deviceType]);

  const handlePresetChange = () => {
    const newIndex = (presetIndex + 1) % presets.length;
    setPresetIndex(newIndex);
    const colors = deviceType === "apple" ? presets[newIndex].apple : presets[newIndex].pc;
    setColors(colors);
    setButtonColor(colors[1]);
    setButtonText(presets[newIndex].text);
  };

  return (
    <div className="preset-selector flex flex-col items-center space-y-4 bg-dark">
      <button 
        className="w-16 h-16 rounded-full transition duration-300 ease-in-out shadow-md bg-gradient-to-b from-white via-[#eae5c9] via-[2%] flex items-center justify-center"
        style={{ backgroundImage: `linear-gradient(to bottom, white, ${buttonColor})` }}
        onClick={handlePresetChange}
      >
        {buttonText}
      </button>
      <p className="text-xs">イースターエッグ</p>
    </div>
  );
};

export default ColorPresetSelector;
