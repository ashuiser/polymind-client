import { createContext, useContext, useState, useEffect, useRef } from 'react';
import PolymindLogo from '../assets/PolymindNewText.png';
import { SidebarCloseIcon, SidebarOpenIcon, X } from 'lucide-react';
import { useMobileSidebarContext } from '../hooks/useMobileSidebarContext';
import { useIsMobileContext } from '../hooks/useIsMobileContext';
import SidebarProfile from './SidebarProfile';


const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);
  const { isMobile } = useIsMobileContext();
  const sidebarRef = useRef(null);
  const { showMobileSidebar, setShowMobileSidebar } = useMobileSidebarContext();

  // Handle click outside for mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        showMobileSidebar &&
        isMobile
      ) {
        setShowMobileSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileSidebar, setShowMobileSidebar, isMobile]);

  const handleToggleClick = () => {
    if (isMobile) {
      setShowMobileSidebar(false);
    } else {
      setExpanded(curr => !curr);
    }
  };

  return (
    <aside className={`h-[100dvh] w-fit transition-all ${showMobileSidebar ? 'absolute z-20 left-0' : 'absolute z-20 -left-100'} lg:relative lg:left-0`} ref={sidebarRef}>
      <nav className='h-full flex flex-col bg-black border-r border-gray-700 shadow-md shadow-gray-700'>
        <div className='p-4 pb-2 flex justify-between items-center'>
          <img src={PolymindLogo} alt="Polymind Logo" className={`overflow-hidden transition-all ${(isMobile ? true : expanded) ? 'w-32' : 'w-0'}`} />
          <button onClick={handleToggleClick} className='p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800'>
            {isMobile ? <X /> : (expanded ? <SidebarCloseIcon /> : <SidebarOpenIcon />)}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded: isMobile ? true : expanded, isMobile }}>
          <ul className='flex-1 px-3'>{children}</ul>
        </SidebarContext.Provider>
        <div className='relative border-t border-gray-700 flex p-2 items-center justify-center'>
          <SidebarProfile expanded={expanded} />
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-gray-800 to-gray-900 text-amber-200" : "hover:bg-gray-900 text-gray-200"
      }`}>
      {icon}
      <span className={`overflow-hidden whitespace-nowrap transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}>{text}</span>
      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-amber-200 ${expanded ? '' : 'top-2'}`} />
      )}
      {!expanded && (
        <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-gradient-to-tr from-gray-800 to-gray-900 text-gray-200 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap`}>
          {text}
        </div>
      )}
    </li>
  )
}