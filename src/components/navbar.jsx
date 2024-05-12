import React from 'react'
import gsap from 'gsap'

function Navbar() {

  const handleMouseEnter = () => {
    gsap.to('.navbar-container', { paddingTop: '1rem', duration: 0.25 })
  }

  const handleMouseLeave = () => {
    gsap.to('.navbar-container', { paddingTop: '0.5rem', duration: 0.25 })
  }

  return (
    <div
      className={`flex flex-row gap-2 items-center justify-center bg-white w-full p-2 fixed z-10 drop-shadow-lg rounded-b-xl font-patrickhand font-bold text-xl navbar-container`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a className="transition ease-soft-spring hover:text-white hover:bg-pink-300 px-5 py-2 rounded-lg" href="#">Home</a>
      <a className="transition ease-soft-spring hover:text-white hover:bg-pink-300 px-5 py-2 rounded-lg" href="#about-me">About Me</a>
      <a className="transition ease-soft-spring hover:text-white hover:bg-pink-300 px-5 py-2 rounded-lg" href="#my-skills">My Skills</a>
      <a className="transition ease-soft-spring hover:text-white hover:bg-pink-300 px-5 py-2 rounded-lg" href="#">Projects</a>
      <a className="transition ease-soft-spring hover:text-white hover:bg-pink-300 px-5 py-2 rounded-lg" href="#">Education</a>
      <a className="transition ease-soft-spring hover:text-white hover:bg-pink-300 px-5 py-2 rounded-lg" href="#">Contact</a>
    </div>
  )
}

export default Navbar
