import MobileSidebarContextProvider from "./contexts/MobileSidebarContextProvider";
import IsMobileContextProvider from "./contexts/isMobileContextProvider";
import ChatPage from "./pages/ChatPage";

export default function App() {
  return (
    <IsMobileContextProvider>
      <MobileSidebarContextProvider>
        <ChatPage />
      </MobileSidebarContextProvider>
    </IsMobileContextProvider>
  )
}