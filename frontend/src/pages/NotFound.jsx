import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <div className="text-center pt-24">
            <h1 className="text-2xl text-red-600">This Page is not found</h1>
            <Link to='/' >
                <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-full text-center  text-sm'>Go Back</button>
            </Link>
        </div>
    )
}
