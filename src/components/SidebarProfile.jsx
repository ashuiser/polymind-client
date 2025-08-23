import { useState, useRef, useEffect } from 'react';
import { useIsMobileContext } from '../hooks/useIsMobileContext';
import { LogOut, UserCog, User } from 'lucide-react';
import { SignOutButton, useUser, ClerkLoaded, ClerkLoading } from '@clerk/clerk-react';
import ShinyText from '../components/ui/ShinyText'

export default function SidebarProfile({ expanded }) {
  const { isMobile } = useIsMobileContext();
  const [showProfileOverview, setShowProfileOverview] = useState(false);
  // containerRef covers both the trigger and the dropdown for accurate outside-click detection
  const containerRef = useRef(null);

  const { user, isLoaded } = useUser();

  let imageSrc = null;

  if (isLoaded) {
    const { imageUrl } = user;
    const params = new URLSearchParams();

    params.set('height', '200');
    params.set('width', '200');
    params.set('quality', '100');
    params.set('fit', 'crop');

    imageSrc = `${imageUrl}?${params.toString()}`;
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowProfileOverview(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <button onClick={() => setShowProfileOverview((prev) => !prev)} className='w-full overflow-hidden flex items-center justify-between p-2 transition-colors duration-150 rounded-md hover:bg-gray-800'>

        <ClerkLoading>
          <User className='w-10 h-10 rounded-md border-2 border-gray-700 text-gray-700 p-1' />
          <div className={`flex justify-between items-center overflow-hidden transition-all h-10 ${(isMobile ? true : expanded) ? 'w-52' : 'w-0'}`}>
            <div className='text-left flex flex-col h-full justify-center'>
              <div className='font-semibold'>
                <ShinyText
                  text="Loading..."
                  speed={2}
                />
              </div>
            </div>
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <img src={imageSrc} alt="profilePicture" className='w-10 h-10 rounded-md' />
          <div className={`flex justify-between items-center overflow-hidden transition-all h-10 ${(isMobile ? true : expanded) ? 'w-52' : 'w-0'}`}>
            <div className='text-left flex flex-col h-full justify-between mb-0.5 overflow-hidden whitespace-nowrap'>
              <div className='font-semibold'>{user.fullName}</div>
              <div className='text-xs text-gray-500'>{user.emailAddresses[0].emailAddress}</div>
            </div>
          </div>
        </ClerkLoaded>
      </button>
      {showProfileOverview && (
        <div
          className="absolute bottom-full mb-2 left-[60%] z-10 w-52 rounded-xl bg-[#0f0f0f] border border-[#282828] shadow-inner transition-all duration-300 overflow-hidden"
        >
          <button
            className="flex items-center justify-between w-full text-left text-white px-4 py-2 hover:bg-gray-800 transition-colors duration-200"
          >
            Manage Account
            <UserCog />
          </button>
          <SignOutButton>
            <div className="flex items-center justify-between w-full text-left text-amber-200 px-4 py-2 hover:bg-gray-800 transition-colors duration-200">
              SignOut
              <LogOut />
            </div>
          </SignOutButton>
        </div>
      )}
    </div>
  )
}
