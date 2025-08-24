import { useState } from "react";
import { TemporaryChatsContext } from "../temporaryChatsContext";

export default function TemporaryChatsContextProvider({ children }) {
  const [temporaryChat, setTemporaryChat] = useState(false);
  return (
    <TemporaryChatsContext.Provider value={{ temporaryChat, setTemporaryChat }}>
      {children}
    </TemporaryChatsContext.Provider>
  )
}
