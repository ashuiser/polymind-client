import { useEffect } from "react";
import ContentArea from "../components/ContentArea";
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
        <SidebarItem icon={<CirclePlus className="h-6 w-6" />} text="New Chat" />
        <SidebarItem icon={<Coins className="h-6 w-6" />} text="Tokens" />
        <SidebarItem icon={<Settings className="h-6 w-6" />} text="Settings" />
        {isMobile && <SidebarItem icon={<HandCoins className="h-6 w-6" />} text="Buy Token" />}
        <SidebarItem icon={<LifeBuoy className="h-6 w-6" />} text="Help" />
        <hr className="my-3 text-gray-700" />
      </Sidebar>
      <main className="h-screen flex-1">
        <ContentArea />
      </main>
    </div>
  )
}
