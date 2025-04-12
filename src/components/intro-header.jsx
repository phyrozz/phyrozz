import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function IntroHeader({ text }) {
  gsap.registerPlugin(useGSAP)

  const container = React.useRef()
  
  useGSAP(
    () => {
      gsap.fromTo("h1", 0.50, {
        y: 50, opacity: 0
      }, {
        y: 0, opacity: 1
      })
    }, {
      scope: container,
      dependencies: [text]
    }
  )

  return (
    <div ref={container} className="flex flex-col h-screen w-full bg-pink-200 justify-center items-center sticky top-0">
      <h1 className="text-center text-6xl text-pink-50 drop-shadow-lg font-bold">{text}</h1>
    </div>
  )
}

export default IntroHeader