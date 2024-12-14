import Header from '@/components/custom/Header'
import { UserButton } from '@clerk/clerk-react'
import { AtomIcon, Edit, Share2 } from 'lucide-react'
import React from 'react'


function Home(){
  return (
    <div>
      <Header/>
      <div>
      
      {/* <Header/> */}
     <section className=" z-50 ">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
       
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Build Your Resume <span className='text-primary'>With AI</span> </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Effortlessly Craft a Standout Resume with Our AI-Powered Builder</p>
        <div className="flex flex-col mb-10 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a href="/dashboard" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Create Resume
                
            </a>
            
        </div>
        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
           
            
        </div> 
    </div>
</section>
   <div>
    {/* <img src={'/grid.svg'} className="absolute z-[-10] w-full" 
      width={1200} height={300} /> */}
   </div>
  </div>
 
    </div>
  )
}

export default Home