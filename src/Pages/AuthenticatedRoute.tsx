import React from 'react'
import { Props } from './DashBoardAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'




const AuthenticatedRoute:React.FC<Props> = ({token}) => {
    if (!token) {
        return <Navigate to="/login" replace />
    }
    return (
        

            <Outlet />
        
    )
        

}

export default AuthenticatedRoute