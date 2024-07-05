import React from 'react'
import watatripLogo from '../assets/watatrip_logo-transparent.png'

const FooterGuest = () => {
  return (
    <div className="text-sm text-slate-700 absolute bottom-2 w-full left-0  px-4 flex sm:flex-row flex-col justify-between items-center">
    <div className="w-full sm:w-1/3  p-1 h-[100px] flex items-center justify-end pr-5">
        <img src={watatripLogo} width="80" height="80" className="mx-auto" />
        
    </div>
    <div className="w-full sm:w-2/3 sm:border-l-2 p-2 flex justify-center"> 
        <ul className="sm:flex-col flex-row flex gap-2 justify-center w-full text-xs">
            <li>
                <a 
                    href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                    Download the app here
                </a>
            </li>
            <li>
                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                    Learn more about the app
                </a>
                
            </li>
        </ul> 
    </div>
</div> 
  )
}

export default FooterGuest