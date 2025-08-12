import { useEffect, useRef } from "react";
import ChatCard from "./ChatCard";

export default function Chats({ chats }) {
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom with smooth transition when new chats are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chats]);

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col w-full h-full px-2 gap-3 overflow-x-hidden overflow-y-auto scrollbar-thin"
    >
      {chats.map(
        (chat, index) =>
          <ChatCard chat={chat} key={index} />
      )}
    </div>
  )
}
