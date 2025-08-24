import { useState } from "react";
import { ChatsContext } from "../chatsContext";

export default function ChatContextProvider({ children }) {
  const [chats, setChats] = useState([]);
  return (
    <ChatsContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatsContext.Provider>
  )
}
