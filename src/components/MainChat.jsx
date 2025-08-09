import { useState, useRef, useEffect } from "react";
import Icon from '@mdi/react';
import { mdiIncognito } from '@mdi/js';
import { ChevronDown, ChevronUp, HandCoins, AlignLeft } from "lucide-react";
import ChatCard from "./ChatCard";
import { useMobileSidebarContext } from '../hooks/useMobileSidebarContext';
import { useIsMobileContext } from "../hooks/useIsMobileContext";

export default function MainChat() {
  const [temporaryChat, setTemporaryChat] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { setShowMobileSidebar } = useMobileSidebarContext();
  const { isMobile } = useIsMobileContext();

  const models = ["GPT-4o", "GPT-4", "Claude 3 Opus", "Mistral 7B"];

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen flex-col justify-between">
      <nav className="flex w-full items-center justify-between py-2 px-4">
        {/* Mobile Menu Button */}
        {isMobile && <button
          onClick={() => setShowMobileSidebar(true)}
          className="p-2 rounded-lg hover:bg-gray-900"
        >
          <AlignLeft className="w-5 h-5" />
        </button>}

        {/* Models Button & Dropdown */}
        <div className="relative p-2 rounded-lg" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center gap-0.5 cursor-pointer"
          >
            <h4 className="text-lg font-semibold">Models</h4>
            {
              showDropdown ? (
                <ChevronUp className="w-5 h-5 mt-1 text-gray-400 stroke-[1.2]" />
              ) : (
                <ChevronDown className="w-5 h-5 mt-1 text-gray-400 stroke-[1.2]" />
              )
            }
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div
              className="absolute top-full mt-2 left-0 z-10 w-48 rounded-xl bg-[#0f0f0f] border border-[#282828] shadow-inner transition-all duration-300 overflow-hidden"
            >
              {models.map((model) => (
                <button
                  key={model}
                  className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-200"
                >
                  {model}
                </button>
              ))}
            </div>
          )}
        </div>
        {!isMobile && <button className="flex items-center gap-2 bg-gradient-to-tr from-gray-800 to-gray-900 text-amber-200 text-sm font-medium px-3 py-2 rounded-full cursor-pointer">
          <HandCoins className="h-5 w-5" />
          <h4>Buy Tokens</h4>
        </button>}
        <button onClick={() => setTemporaryChat((curr) => !curr)} className={`p-2 rounded-xl cursor-pointer ${temporaryChat ? 'bg-gray-800' : 'hover:bg-gray-900'}`}>
          <Icon path={mdiIncognito} size={1} />
        </button>
      </nav>
      <div className="flex flex-col items-center h-full w-full">
        <div className="flex-1 flex justify-center items-center w-full max-w-3xl">
          {
            temporaryChat ?
              <div className='flex flex-col justify-center items-center gap-2  text-center px-4'>
                <h1 className="text-3xl font-semibold">Temporary Chat</h1>
                <p>This chat won't appear in history, use or update PolyMind's memory.</p>
              </div>
              : <h1 className="text-3xl font-semibold text-center px-4">Where should we begin?</h1>
          }
        </div>
        <div className="flex justify-center p-6 w-full">
          <ChatCard />
        </div>
      </div>
    </div>
  )
}
