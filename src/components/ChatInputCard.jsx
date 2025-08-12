import { PlusIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useState, useRef } from "react";

export default function ChatInputCard({ setChats }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [textHeight, setTextHeight] = useState("auto");
  const textareaRef = useRef(null);

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
    const shouldExpand = newHeight > 5; //shouldExpand when height > 5rem
    const wasExpanded = isExpanded;
    setIsExpanded(shouldExpand);

    // Maintain focus after layout change
    if (wasExpanded !== shouldExpand) {
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
    if (textValue.trim()) {
      // Handle form submission here
      setChats(prev => [...prev, textValue]);
      console.log("Submitted text:", textValue);

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
    <div className="w-full max-w-3xl px-4">
      <form onSubmit={handleSubmit}>
        <div className={`relative flex items-center justify-center w-full bg-[#0f0f0f] px-4 pb-3 ${isExpanded ? '' : 'pt-3'} shadow-inner transition-colors duration-150 min-h-[3.5rem] border border-[#282828] focus-within:border-[#454545] ${isExpanded ? 'rounded-2xl' : 'rounded-full'
          }`}>

          {/* Main content area with conditional layout */}
          <div className={`flex gap-3 w-full ${isExpanded ? 'flex-col' : 'items-center'}`}>

            {/* When expanded: Textarea on top */}
            {isExpanded ? (
              <>
                {/* Text area container with blur effect */}
                <div className="relative flex-1">
                  {/* Top blur gradient */}
                  <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#0f0f0f] to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-150" />

                  <textarea
                    ref={textareaRef}
                    value={textValue}
                    rows={1}
                    placeholder="Ask anything"
                    className="bg-transparent px-1 resize-none w-full text-white placeholder:text-gray-400 focus:outline-none max-h-[22rem] overflow-auto 
                    scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500"
                    style={{
                      height: textHeight,
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#4B5563 transparent'
                    }}
                    onInput={handleInput}
                    onScroll={(e) => {
                      // Update blur effect on scroll
                      const topBlur = e.target.parentElement.querySelector('.absolute.top-0');
                      const bottomBlur = e.target.parentElement.querySelector('.absolute.bottom-0');

                      if (topBlur) {
                        topBlur.style.opacity = e.target.scrollTop > 5 ? 1 : 0;
                      }

                      if (bottomBlur) {
                        const isScrolledToBottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 5;
                        bottomBlur.style.opacity = isScrolledToBottom ? 0 : 1;
                      }
                    }}
                  />

                  {/* Bottom blur gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#0f0f0f] to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-150" />
                </div>

                {/* Bottom row with plus icon and send button */}
                <div className="flex items-center justify-between w-full">
                  <PlusIcon className="h-5 w-5 text-white shrink-0" />
                  <button type="submit" className="bg-gray-800 hover:bg-gray-700 text-amber-200 rounded-full p-2 shrink-0 transition-colors duration-150">
                    <ArrowUpIcon className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Original horizontal layout for short text */}
                <PlusIcon className="h-5 w-5 text-white shrink-0" />

                <textarea
                  ref={textareaRef}
                  value={textValue}
                  rows={1}
                  placeholder="Ask anything"
                  className="bg-transparent resize-none w-full text-white placeholder:text-gray-400 focus:outline-none overflow-hidden"
                  style={{ height: textHeight }}
                  onInput={handleInput}
                />

                <button type="submit" className="bg-gray-800 hover:bg-gray-700 text-amber-200 rounded-full p-2 shrink-0 transition-colors duration-150">
                  <ArrowUpIcon className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}