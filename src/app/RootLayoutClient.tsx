'use client';

import { Zen_Kurenaido } from 'next/font/google';
import "./globals.css";
import { ReactNode, useState, useEffect } from "react";
import { Suspense } from "react";
import Background from "./components/back";
import { ColorPresetProvider } from "./components/ColorPresetContext";
import { ListsProvider } from '../app/components/ListsContext';
import useScrollToTop from './components/useScrollToTop';
import SplashScreen from './components/SplashScreen';

const zenKurenaido = Zen_Kurenaido({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useScrollToTop();

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className={zenKurenaido.className}>
      {loading ? (
        <SplashScreen />
      ) : (
        <ColorPresetProvider>
          <ListsProvider>
            <div className="text-black">
              <Suspense>
                <Background />
                {children}
              </Suspense>
            </div>
          </ListsProvider>
        </ColorPresetProvider>
      )}
    </div>
  );
}