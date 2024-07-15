"use client"

import React, { createContext, useContext } from 'react';
import { ListItem, Lists } from '../components/Lists';

interface ListsContextType {
  lists: ListItem[];
}

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export const ListsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ListsContext.Provider value={{ lists: Lists }}>
      {children}
    </ListsContext.Provider>
  );
};

export const useLists = () => {
  const context = useContext(ListsContext);
  if (context === undefined) {
    throw new Error('useLists must be used within a ListsProvider');
  }
  return context;
};
