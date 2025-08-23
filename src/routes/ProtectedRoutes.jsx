import { useAuth } from "@clerk/clerk-react";
import { Outlet, Navigate } from "react-router";
import { LucidLoader } from "../components/ui/Loader";

export default function ProtectedRoutes() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded || isSignedIn === undefined) return <LucidLoader />;
  return isSignedIn ? <Outlet /> : <Navigate to="/signin" />;
}
