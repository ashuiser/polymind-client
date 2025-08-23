import { Loader } from "lucide-react";

export const LucidLoader = ({ className }) => {
  return (
    <div className={className}>
      <Loader className="animate-spin h-8 w-8" />
    </div>
  )
}