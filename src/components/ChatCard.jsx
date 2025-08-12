import { Copy, SquarePen } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ChatCard({ chat }) {
  return (
    <div className='group flex flex-col gap-1 w-full items-end justify-end'>
      {
        chat.role === "user" ?
          <div className='max-w-[70%] h-fit px-4 py-3 rounded-[18px] bg-[#0F0F0F]'>
            {chat.message}
          </div>
          : <div className="w-full h-fit text-left">
            <ReactMarkdown>
              {chat.message.replace(/\\n/g, '\n')}
            </ReactMarkdown>
          </div>
      }
      <div className='flex gap-1 transition-all duration-200 opacity-100 lg:opacity-0 group-hover:opacity-100'>
        <button className="flex items-center justify-center p-2 rounded-lg transition-colors duration-150 hover:bg-[#17181a]">
          <Copy size={16} />
        </button>
        {/* <button className="flex items-center justify-center p-2 rounded-lg transition-colors duration-150 hover:bg-[#17181a]">
          <SquarePen size={16} />
        </button> */}
      </div>
    </div>
  )
}
