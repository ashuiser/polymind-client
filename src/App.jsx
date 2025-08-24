import AppRoutes from "./routes/AppRoutes";
import MobileSidebarContextProvider from "./contexts/contextProviders/MobileSidebarContextProvider";
import IsMobileContextProvider from "./contexts/contextProviders/IsMobileContextProvider";
import ChatContextProvider from "./contexts/contextProviders/ChatsContextProvider";
import TemporaryChatsContextProvider from "./contexts/contextProviders/TemporaryChatsContextProvider";


export default function App() {
  return (
    <ChatContextProvider>
      <TemporaryChatsContextProvider>
        <IsMobileContextProvider>
          <MobileSidebarContextProvider>
            <AppRoutes />
          </MobileSidebarContextProvider>
        </IsMobileContextProvider>
      </TemporaryChatsContextProvider>
    </ChatContextProvider>
  )
}