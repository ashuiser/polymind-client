import { Loader } from "lucide-react";

export const LucidLoader = () => {
  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center text-gray-600">
      <Loader className="animate-spin h-8 w-8" />
    </div>
  )
}