import { Routes, Route } from "react-router";
import AuthPageLayout from "../pages/AuthPageLayout";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { dark } from '@clerk/themes';
import ProtectedRoutes from "./ProtectedRoutes";
import ChatPage from "../pages/ChatPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthPageLayout />}>
        <Route
          path="/signin"
          element={
            <SignIn
              appearance={{
                baseTheme: dark,
              }}
              signUpUrl="/signup"
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              appearance={{
                baseTheme: dark,
              }}
              signInUrl="/signin"
            />
          }
        />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<ChatPage />} />
      </Route>
    </Routes>
  )
}
