import ChatInputCard from "./ChatInputCard";
import Chats from "./Chats";
import { useChatsContext } from "../hooks/useChatsContext";
import { useTemporaryChatsContext } from '../hooks/useTemporaryChatsContext';

export default function MainChat() {
  const { chats } = useChatsContext();
  const { temporaryChat } = useTemporaryChatsContext();

  return (
    <div className="realtive flex flex-col items-center h-full w-full overflow-hidden">
      <div className=" flex-1 flex justify-center w-full overflow-hidden">
        {/* <!-- Blur overlay (top to bottom) --> */}
        <div
          className="absolute top-0 left-0 right-0 h-28 pointer-events-none
          backdrop-blur-md
          [mask-image:linear-gradient(to_bottom,black,transparent)]
          [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]
          bg-gradient-to-b from-black to-transparent">
        </div>
        {
          chats.length > 0 ?
            <Chats chats={chats} />
            : (
              <div className="flex items-center justify-center h-full w-full max-w-5xl px-4">
                {temporaryChat ?
                  <div className='flex flex-col justify-center items-center gap-2 text-center px-4'>
                    <h1 className="text-3xl font-semibold">Temporary Chat</h1>
                    <p>This chat won't appear in history, use or update PolyMind's memory.</p>
                  </div>
                  : <h1 className="text-3xl font-semibold text-center px-4">Where should we begin?</h1>
                }
              </div>
            )
        }
        {/* <!-- Blur overlay --> */}
        <div
          class="absolute bottom-0 left-0 right-0 h-40 pointer-events-none 
           backdrop-blur-md 
           [mask-image:linear-gradient(to_bottom,transparent,black)] 
           [-webkit-mask-image:linear-gradient(to_bottom,transparent,black)] 
           bg-gradient-to-b from-transparent to-gray-900/70">
        </div>
      </div>
      <div className="absolute bottom-0 z-10 flex justify-center pb-6 w-full">
        <ChatInputCard />
      </div>
    </div>
    // <div className="relative flex h-[100dvh] max-w-screen flex-col justify-between items-center">
    // </div>
  )
}
