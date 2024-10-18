import React from 'react'
import { useAuth } from '../Context/authContext'
import { useNavigate } from 'react-router-dom'

const Users = () => {
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    return(
        <div>
            <p>Welcome</p>
        </div>
    )
}

export default Users