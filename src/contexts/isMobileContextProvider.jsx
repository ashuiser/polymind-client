import { useState } from 'react';
import { IsMobileContext } from './isMobileContext';

export default function IsMobileContextProvider({ children }) {
  const [isMobile, setIsMobile] = useState();
  return (
    <IsMobileContext.Provider value={{ isMobile, setIsMobile }}>
      {children}
    </IsMobileContext.Provider>
  );
}
