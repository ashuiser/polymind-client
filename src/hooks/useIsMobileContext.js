import { useContext } from "react";
import { IsMobileContext } from "../contexts/isMobileContext";

export const useIsMobileContext = () => {
  const context = useContext(IsMobileContext);
  if (!context) {
    throw new Error('useIsMobileContext must be used within a IsMobileContextProvider');
  }
  return context;
}