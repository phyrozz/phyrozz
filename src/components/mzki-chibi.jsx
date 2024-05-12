import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function MzkiChibi() {
  gsap.registerPlugin(useGSAP)

  const mzkiRef = React.useRef(null)
  const bubbleTextRef = React.useRef(null)

  useGSAP(() => {
    const mzki = mzkiRef.current
    const bubbleText = bubbleTextRef.current

    const bubbleTextAnimation = () => {
      // Hide the bubble text initially
      gsap.set(bubbleText, { opacity: 0 })

      // Show the bubble text after 1.5 second
      gsap.to(bubbleText, { opacity: 1, duration: 0.25, delay: 1.5, ease: "expo.out" })

      // Hide the bubble text after 5 seconds
      setTimeout(() => {
        gsap.to(bubbleText, { opacity: 0, duration: 0.25, ease: "expo.out" })
      }, 5000)
    }

    const jumpAnimation = () => {
      // generate random delay for next jump
      const delay = Math.random() * 4 + 3
      // generate random jump distance
      const jumpDistance = Math.random() * 50 + 25

      // tween to jump the image up and then back down
      gsap.to(mzki, {
        y: '-=' + jumpDistance, // move up
        duration: 0.15, // duration of up movement
        ease: "easeIn",
        onComplete: () => {
          gsap.to(mzki, {
            y: 0, // move back down slightly
            duration: 0.15, // duration of down movement
            onComplete: () => {
              setTimeout(jumpAnimation, delay * 1000)
            },
          })
        },
      })
    }

    bubbleTextAnimation()
    jumpAnimation()

    return () => {
      gsap.killTweensOf(mzki)
      gsap.killTweensOf(bubbleText)
    }
  })

  const handleOnChibiClick = () => {
    const mzki = mzkiRef.current

    // generate random jump distance
    const jumpDistance = Math.random() * 50 + 25

    // tween to jump the image up and then back down
    gsap.to(mzki, {
      y: '-=' + jumpDistance, // move up
      duration: 0.15, // duration of up movement
      ease: "easeIn",
      onComplete: () => {
        gsap.to(mzki, {
          y: 0, // move back down slightly
          duration: 0.15, // duration of down movement
        })
      },
    })
  }

  return (
    <div className="fixed bottom-4 right-4 z-30 cursor-pointer">
      <div ref={bubbleTextRef} className="-left-40 top-4 absolute bg-white py-5 px-10 z-10 rounded-full font-patrickhand font-bold shadow-lg">Scroll/swipe down to get started!</div>
      <img
        ref={mzkiRef}
        id="mzki"
        className="w-64"
        src="phyrozz/mzki_chibi.png"
        alt="Mzki Chibi"
        onClick={handleOnChibiClick}
      />
    </div>
  )
}

export default MzkiChibi
