import React from 'react'
import { useAuth } from '../Context/authContext'
import { useNavigate } from 'react-router-dom'

const live = () => {
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    return(
        <div>
            
        </div>
    )
}