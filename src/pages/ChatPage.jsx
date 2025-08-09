import { useEffect } from "react";
import MainChat from "../components/MainChat";
import Sidebar from "../components/Sidebar";
import { SidebarItem } from "../components/Sidebar";
import { useIsMobileContext } from "../hooks/useIsMobileContext";
import {
  CirclePlus,
  Coins,
  LifeBuoy,
  HandCoins,
  Settings,
} from "lucide-react";

export default function ChatPage() {
  const { isMobile, setIsMobile } = useIsMobileContext();
  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="relative text-white bg-black h-screen w-screen flex overflow-hidden">
      <Sidebar>
        <hr className="my-3 text-gray-700" />
        <SidebarItem icon={<CirclePlus size={20} />} text="New Chat" />
        <SidebarItem icon={<Coins size={20} />} text="Tokens" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" />
        {isMobile && <SidebarItem icon={<HandCoins size={20} />} text="Buy Token" />}
        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
        <hr className="my-3 text-gray-700" />
      </Sidebar>
      <main className="h-screen flex-1">
        <MainChat />
      </main>
    </div>
  )
}
