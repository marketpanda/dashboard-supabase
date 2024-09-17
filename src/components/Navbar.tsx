 
import { Link, useLocation } from 'react-router-dom'
import watatripLogo from '../assets/watatrip_logo-transparent.png'
import { cn } from '../lib/utils'
import { buttonVariants } from './ui/button'
import { LucideIcon } from 'lucide-react'


type NavProps = {
  isCollapsed: Boolean,
  links: {
    location: string
    title: string
    label?: string
    icon: LucideIcon,
    variant: "default" | "ghost"
  }[]
}

const Navbar = ({links, isCollapsed}:NavProps) => {
  
  const { pathname } = useLocation() 

  const addParentToLocation = (location:string):string => {
    if (!location.startsWith('/dashboard')) {
      return '/dashboard' + location
    }
    return location
  }

  const updatedLinks = links.map((link) => ({
    ...link, location: addParentToLocation(link.location)
  }))

  return (
    <div className='bg-white'>
      <div className='flex justify-center'><img  src={watatripLogo} alt="Watatrip Logo" className='w-[100px]' /></div>
      <div data-collapsed={isCollapsed} className='group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'>

        <nav className='sticky top-0 z-10 grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
          {
            updatedLinks.map((link, index) => 
              isCollapsed ? (
                <Link to={link.location} className={cn(buttonVariants({ variant: link.variant, size : "icon" }), "h-9 w-9",
                pathname === link.location 
                    ? "bg-muted hover:bg-muted"
                    : "hover:bg-transparent hover:underline"  
                 )}>
                  <link.icon className={"h-4 w-4"} />
                </Link>
              ) : (

                <Link key={index} to={link.location} className={cn(buttonVariants({ variant: link.variant, size : "sm" }), 
                  pathname === link.location 
                    ? "bg-muted hover:bg-muted"
                    : "hover:bg-transparent hover:underline",
                  "justify-start",
                  )}>
                  <link.icon className='mr-2 h-4 w-4' />
                  {link.label}
                 
                </Link>
              )
            )
          }

        </nav>

      </div>
    </div>
  )
}

export default Navbar