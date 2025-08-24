import { useAuth } from "@clerk/clerk-react";
import { Outlet, Navigate } from "react-router";
import { LucidLoader } from "../components/Loader";

export default function ProtectedRoutes() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded || isSignedIn === undefined) return <LucidLoader className="h-[100dvh] w-screen bg-black flex justify-center items-center text-gray-600" />;
  return isSignedIn ? <Outlet /> : <Navigate to="/signin" />;
}
