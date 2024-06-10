import React, { createContext, useContext, useRef, RefObject, ReactNode } from 'react';

interface MiddleAreaContextType {
  middleAreaRef: RefObject<HTMLDivElement>;
}

const MiddleAreaContext = createContext<MiddleAreaContextType | undefined>(undefined);

export const MiddleAreaProvider = ({ children }: { children: ReactNode }) => {
  const middleAreaRef = useRef<HTMLDivElement>(null);

  return (
    <MiddleAreaContext.Provider value={{ middleAreaRef }}>
      {children}
    </MiddleAreaContext.Provider>
  );
};

export const useMiddleArea = () => {
  const context = useContext(MiddleAreaContext);
  if (!context) {
    throw new Error('useMiddleArea must be used within a MiddleAreaProvider');
  }
  return context;
};
