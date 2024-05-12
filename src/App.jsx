import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import IntroHeader from './components/intro-header'
import Navbar from './components/navbar'
import { Progress, Button } from '@nextui-org/react'
import skills from "./data/skills.json"
import SkillsContainer from './components/skills-container'
import MzkiChibi from './components/mzki-chibi'

function App() {
  const [text, setText] = React.useState("Hi!")

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const offset1 = 1000
      const offset2 = 2500
      if (scrollPosition >= offset1 && scrollPosition < offset2) {
        setText('I am Joshua Malabanan')
      } else if (scrollPosition >= offset2) {
        setText('and I am a Junior Web Developer!')
      } else {
        setText('Hi!')
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // sort skills array by progress value
  const sortedSkills = skills.sort((a, b) => b.progress - a.progress)

  return (
    <div className="cursor-default">
      <MzkiChibi />
      <Navbar />
      <div className="font-patrickhand h-[600vh]">
        <IntroHeader text={text} />
      </div>

      <div id="about-me" className="bg-pink-200 h-[200vh]">
        <div className="sticky top-0 md:p-10 p-5 flex flex-col justify-center items-center gap-10 h-screen">
          <div className="w-full">
            <h1 className="text-6xl font-patrickhand text-white drop-shadow-lg text-center font-bold">About Me</h1>
          </div>

          <div className="bg-white rounded-xl md:p-10 p-5 shadow-2xl font-patrickhand md:text-xl grid grid-cols-5 gap-10 md:text-left text-center w-full max-w-full md:max-w-[850px] transition ease-soft-spring hover:scale-105">
            <div className="md:col-span-3 col-span-5 flex flex-col gap-5 cursor-default">
              <p>I'm <b><u>Joshua Malabanan</u></b>, but you can call me Phyrozz, Reimu, or just plain ol' Josh!</p>
              <p>I make web applications, mostly specializing in back-end. I also do front-end coding, though I'm not that really creative on designing web pages.</p>
              <p>I'm still learning about Web Development but I'm definitely pursuing it because I find coding in React very fun! :3</p>
              <p>Besides coding, I also cosplay and play drums!</p>
            </div>
            <div className="md:col-span-2 col-span-5 w-full flex flex-col justify-center items-center relative group">
              <div className="absolute -bottom-7 -right-7 z-10 bg-pink-300 p-2 shadow-lg rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity ease-soft-spring cursor-default">
                Yup, that's me
              </div>
              <div>
                <img className="w-96 aspect-square object-top object-cover shadow-xl cursor-pointer transition-all hover:rotate-3 hover:scale-110 hover:shadow-2xl" src="me.jpg" alt="Cosplay picture of me." />
              </div>
            </div>
          </div>

          {/* <div className="bg-white rounded-xl p-10 shadow-2xl font-patrickhand md:text-xl md:text-left text-center w-full max-w-full md:max-w-[850px] transition ease-soft-spring hover:scale-105">
            <div className="flex flex-col gap-5 cursor-default">
              <h1 className="text-3xl font-bold text-center">My Favorites</h1>
              <p className=""></p>
            </div>
          </div> */}
        </div>
      </div>

      <div id="my-skills" className="bg-pink-200 h-[500vh]">
        <div className="sticky top-0 p-10 flex flex-col justify-center items-center gap-10 min-h-screen">
          <div className="w-full pt-10">
            <h1 className="text-6xl font-patrickhand text-white drop-shadow-lg text-center font-bold">My Skills</h1>
          </div>

          <div className="flex flex-row flex-wrap w-full md:gap-10 gap-5 justify-center">
            {sortedSkills.map(skill => (
              <SkillsContainer key={skill.name} name={skill.name} progress={skill.progress} iconSrc={skill.iconSrc} iconAlt={skill.iconAlt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
