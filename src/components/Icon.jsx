import React from 'react'

function Icon({ icon, note }) {
    return (
        <div className="flex items-center md:bg-white  md:hover:bg-blue-100 duration-300 cursor-pointer  md:mr-2 md:p-3  justify-center md:rounded-full bg-transparent p-0 mr-0 aspect-square">
            <img src={icon} alt="icon" className="md:w-14 w-10 hover:text-white " />
        </div>
    )
}

export default Icon