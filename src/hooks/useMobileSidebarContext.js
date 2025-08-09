import { useContext } from 'react';
import { MobileSidebarContext } from '../contexts/mobileSidebarContext.js';

export const useMobileSidebarContext = () => {
  const context = useContext(MobileSidebarContext);
  if (!context) {
    throw new Error('useMobileSidebarContext must be used within a MobileSidebarContextProvider');
  }
  return context;
};
