import React from 'react'
import Navbar from '../Components/Navbar'

import binayakPhoto from '../assets/binayakbishnu.jpg';
import { BsGithub, BsGlobe2, BsLinkedin, BsMedium } from 'react-icons/bs';

function About() {
    return (
        <div className='min-h-screen flex flex-col gap-0 items-center'>
            <Navbar />
            <div className='flex flex-col justify-between items-start flex-1 bg-[rgb(39,52,68)] bg-opacity-80 p-4 rounded text-left w-full mx-4 sm:w-[70vw] m-auto mt-5 mb-5'>
                <div>
                    <h2 className="text-4xl">About</h2>
                    <hr />
                    <div className='border border-white p-2 rounded mt-2'>
                        <p>Create your own digital recipe book.</p>
                        <p>
                            Users can log in and have their personalized recipe collections assembled. This platform enables multiple recipes to be effortlessly compiled by individuals, providing a delightful hub for culinary enthusiasts to organize and share their culinary creations.
                        </p>
                    </div>
                </div>

                <div className='border border-white m-auto rounded w-full md:w-[46%] p-2 flex flex-col md:flex-row justify-between items-stretch gap-2 md:gap-4'>
                    <div className='flex flex-row items-center gap-2 md:gap-4'>
                        <img src={binayakPhoto} alt='Binayak Photo' className='w-[60px] md:w-auto md:h-[100px] md:my-2 rounded-full' />
                        <div>
                            <p className='text-lg font-bold'>Binayak Bishnu</p>
                            <p className='text-sm italic'>Frontend Web Developer</p>
                        </div>
                    </div>
                    {/* social media */}
                    <div className='mt-2 md:mt-0 flex flex-row md:flex-col justify-around px-1'>
                        <a href="https://binayakbishnu.web.app" target="_blank" rel="noreferrer">
                            <BsGlobe2 />
                        </a>
                        <a href="https://www.linkedin.com/in/binayakbishnu" target='_blank' rel="noreferrer">
                            <BsLinkedin />
                        </a>
                        <a href="https://github.com/binayakbishnu" target='_blank' rel="noreferrer">
                            <BsGithub />
                        </a>
                        <a href="https://medium.com/@binayakbishnu" target='_blank' rel="noreferrer">
                            <BsMedium />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About