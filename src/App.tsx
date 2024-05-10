 
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Profile from './Pages/Profile'

import HomePage from './Pages/HomePage'
import Profiles from './Pages/Profiles'
import Rentals from './Pages/Rentals'
import Places from './Pages/Places'
import NotFoundPage from './Pages/NotFoundPage.tsx'

import { Card } from './components/ui/card'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable'
import { 
  Inbox,
  File,
  Search,
  Users2,
  MapIcon,
  Map,
  HomeIcon,
  
 } from 'lucide-react'
import { useState } from 'react'
import { cn } from './lib/utils.ts'

function App() {

  const [isCollapsed, setIsCollapsed] = useState(false)
 

  return (
    <>
      <Card className='flex overflow-hidden'>
        <ResizablePanelGroup direction='horizontal'
            onLayout={(sizes:number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`}}
        >
          <ResizablePanel
            defaultSize={20}
            collapsible={true}
            maxSize={20}
            minSize={5}
            collapsedSize={4} 
            onCollapse={(collapsed) => {
              setIsCollapsed(true)
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(collapsed)}`
            }}
            onExpand={() => {
              setIsCollapsed(false)
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
            }}
            className={cn( isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
          >

            <Navbar isCollapsed={isCollapsed} links={[
              {
                location: "/",
                title: "home",
                label: "Bulk Upload",
                icon: Inbox,
                variant: "ghost"
              },
              {
                location: "/places",
                title: "places",
                label: "Places",
                icon: MapIcon,
                variant: "ghost"
              },
              {
                location: "/rentals",
                title: "rentals",
                label: "Rentals",
                icon: HomeIcon,
                variant: "ghost"
              },
              {
                location: "/profiles",
                title: "profiles",
                label: "Profiles",
                icon: Users2,
                variant: "ghost"
              },
            ]} />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel>
            <Routes>
             
              <Route path="/" element={<HomePage />} />
              <Route path="/places" element={<Places />} />
              <Route path="/rentals" element={<Rentals />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes> 
          </ResizablePanel>
        </ResizablePanelGroup>
      
      </Card> 
    </>
  )
}

export default App
