import React from "react"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function AboutMe({ text }) {
  gsap.registerPlugin(useGSAP)

  const container = React.useRef()
  const textContent = React.useRef("")
  
  useGSAP(
    () => {
      // Convert the JSX to a string for comparison
      const newContent = text.props.children.toString()
      const currentContent = textContent.current.toString()

      if (currentContent !== newContent) {
        textContent.current = newContent
        
        gsap.fromTo(container.current.querySelector("p"), {
          opacity: 0
        }, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        })
      }
    }, {
      scope: container,
      dependencies: [text]
    }
  )

  return (
    <div className="bg-pink-50 rounded-xl md:p-10 p-5 shadow-2xl font-patrickhand text-pink-950 md:text-xl grid grid-cols-1 md:grid-cols-5 gap-10 text-left w-full max-w-full md:max-w-[850px] transition ease-soft-spring hover:scale-105">
      <div className="md:col-span-2 md:order-1 order-1 w-full flex flex-col justify-center items-center relative group">
        <div className="absolute -bottom-7 md:-right-9 right-1/4 z-10 bg-pink-300 p-2 shadow-lg rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity ease-soft-spring cursor-default">
          Yup, that's me
        </div>
        <div className="flex justify-center">
          <img className="rounded-lg md:w-96 w-1/2 aspect-square object-top object-cover shadow-xl cursor-pointer transition-all hover:rotate-3 hover:scale-110 hover:shadow-2xl" src="me.jpg" alt="Cosplay picture of me." />
        </div>
      </div>
      <div ref={container} className="md:col-span-3 md:order-2 order-2 flex flex-col gap-5 cursor-default md:text-2xl text-lg justify-center md:text-left text-center">
        {text}
      </div>
    </div>
  )
}

export default AboutMe