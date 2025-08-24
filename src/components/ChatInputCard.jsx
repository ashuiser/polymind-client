import { PlusIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useState, useRef } from "react";
import { useChatsContext } from "../hooks/useChatsContext";

export default function ChatInputCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [textHeight, setTextHeight] = useState("auto");
  const textareaRef = useRef(null);
  const { setChats } = useChatsContext();

  const handleInput = (e) => {
    const value = e.target.value;
    setTextValue(value);

    // Auto-grow textarea
    const rootFontSize = parseInt(getComputedStyle(document.documentElement).fontSize);
    e.target.style.height = "auto";
    const newHeight = Math.min((e.target.scrollHeight) / rootFontSize, 22);
    e.target.style.height = newHeight + "rem";
    setTextHeight(newHeight + "rem");

    // Check if we should switch to expanded layout (more than ~3 lines)
    const shouldExpand = newHeight >= 3; //shouldExpand when height > 5rem
    const wasExpanded = isExpanded;

    // Maintain focus after layout change
    if (wasExpanded !== shouldExpand) {
      setIsExpanded(shouldExpand)
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          // Restore cursor position to end
          const length = textareaRef.current.value.length;
          textareaRef.current.setSelectionRange(length, length);
        }
      }, 50); // Small delay to allow layout change
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTextValue = textValue.trim();
    if (trimmedTextValue) {
      // Handle form submission here
      const chat = {
        role: "user",
        message: trimmedTextValue,
      }
      setChats(prev => [...prev, chat]);
      console.log("Submitted text:", chat);

      // Reset form
      setTextValue("");
      setTextHeight("auto");
      setIsExpanded(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };


  return (
    <div className="w-full max-w-4xl px-4">
      <form onSubmit={handleSubmit}>
        <div className={`relative flex items-center justify-center w-full bg-[#0f0f0f] px-4 pb-3 ${isExpanded ? '' : 'pt-3'} shadow-inner transition-colors duration-150 min-h-[3.5rem] border border-[#282828] focus-within:border-[#454545] ${isExpanded ? 'rounded-2xl' : 'rounded-full'
          }`}>

          {/* Main content area with conditional layout */}
          <div className={`flex  gap-3 w-full  relative`}>


            <>
              {/* Original horizontal layout for short text */}
              <PlusIcon className="h-5 w-5 mb-0.5 absolute bottom-0 text-white shrink-0" />

              <textarea
                ref={textareaRef}
                value={textValue}
                rows={1}
                name="promptField"
                placeholder="Ask anything"
                className={`bg-transparent resize-none w-full text-white placeholder:text-gray-400 focus:outline-none overflow-hidden overflow-y-auto scrollbar-thin mx-10 ${isExpanded ? 'mb-7 mt-3' : ''}`}
                style={{ height: textHeight }}
                onInput={handleInput}
              />

              <button type="submit" className=" absolute -bottom-1 right-0 bg-gray-800 hover:bg-gray-700 text-amber-200 rounded-full p-2 shrink-0 transition-colors duration-150">
                <ArrowUpIcon className="h-4 w-4" />
              </button>
            </>

          </div>
        </div>
      </form>
    </div>
  )
}