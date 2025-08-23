import PolymindLogo from '../assets/PolymindNewText.png';
import { Outlet } from 'react-router';
import { LucidLoader } from '../components/Loader';
import { ClerkLoading, ClerkLoaded } from '@clerk/clerk-react';
import { HeroHighlight } from '../components/ui/HeroHighlight';

export default function AuthPageLayout() {
  return (
    <>
      <ClerkLoading>
        <LucidLoader className="h-screen w-screen bg-black flex justify-center items-center text-gray-600" />
      </ClerkLoading>
      <ClerkLoaded>
        <HeroHighlight containerClassName="h-fit w-fit">
          <div className='w-screen h-fit min-h-screen overflow-x-hidden relative bg-transparent flex items-center justify-center pt-6 pb-4'>
            <div className='h-fit w-fit flex flex-col gap-7 items-center text-white'>
              <img src={PolymindLogo} alt="Polymind Logo" className='w-42 lg:w-52' />
              {/* <div>
                <h1 className='text-lg lg:text-xl font-bold text-center'>Lost between models?</h1>
                <h1 className='text-2xl lg:text-3xl font-bold text-center'>Found in PolyMind.</h1>
              </div> */}
              <Outlet />
              <div>
                <h4 className='text-center text-md sm:text-lg font-semibold'>All models. One token.</h4>
                <h4 className='text-center text-md sm:text-lg font-semibold'>Shared mind.</h4>
              </div>
            </div>
          </div>
        </HeroHighlight>
      </ClerkLoaded>
    </>
  )
}
