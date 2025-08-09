import { useState } from 'react';
import { MobileSidebarContext } from './mobileSidebarContext';

export default function MobileSidebarContextProvider({ children }) {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <MobileSidebarContext.Provider value={{ showMobileSidebar, setShowMobileSidebar }}>
      {children}
    </MobileSidebarContext.Provider>
  );
}
