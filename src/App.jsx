import MobileSidebarContextProvider from "./contexts/MobileSidebarContextProvider";
import IsMobileContextProvider from "./contexts/isMobileContextProvider";
import AppRoutes from "./routes/AppRoutes";


export default function App() {
  return (
    <IsMobileContextProvider>
      <MobileSidebarContextProvider>
        <AppRoutes />
      </MobileSidebarContextProvider>
    </IsMobileContextProvider>
  )
}