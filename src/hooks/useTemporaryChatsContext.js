import { useContext } from "react";
import { TemporaryChatsContext } from "../contexts/temporaryChatsContext";

export const useTemporaryChatsContext = () => {
  const context = useContext(TemporaryChatsContext);
  if (!context) {
    throw new Error('useTemporaryChatsContext must be used within a TemporaryChatsContextProvider');
  }
  return context;
}