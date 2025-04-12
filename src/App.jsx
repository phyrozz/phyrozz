import React from 'react'
import IntroHeader from './components/intro-header'
import Navbar from './components/navbar'
import skills from "./data/skills.json"
import SkillsContainer from './components/skills-container'
import MzkiChibi from './components/mzki-chibi'
import ProjectsContainer from './components/projects-container'

function App() {
  const [text, setText] = React.useState("Hi!")

  React.useEffect(() => {
    // scroll to top when the page is refreshed
    window.history.scrollRestoration = 'manual'

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
  const sortedLanguageSkills = skills.languages.sort((a, b) => b.progress - a.progress)
  const sortedFrameworkSkills = skills.webFrameworks.sort((a, b) => b.progress - a.progress)
  const sortedDBMSSkills = skills.dbms.sort((a, b) => b.progress - a.progress)

  return (
    <div id="page" className="cursor-default">
      <MzkiChibi />
      <Navbar />
      <div className="font-patrickhand h-[600vh]">
        <IntroHeader text={text} />
      </div>

      <div id="about-me" className="bg-pink-200">
        <div className="top-0 md:p-10 p-5 flex flex-col justify-center items-center gap-10">
          <div className="w-full">
            <h1 className="text-6xl font-patrickhand text-pink-50 drop-shadow-lg text-center font-bold">About Me</h1>
          </div>

          <div className="bg-pink-50 rounded-xl md:p-10 p-5 shadow-2xl font-patrickhand text-pink-950 md:text-xl grid grid-cols-5 gap-10 md:text-left text-center w-full max-w-full md:max-w-[850px] transition ease-soft-spring hover:scale-105">
            <div className="md:col-span-3 col-span-5 flex flex-col gap-5 cursor-default">
              <p>Hi! I'm <b>Joshua Malabanan</b>, but you can call me Reimu, <b><u><a href='https://www.youtube.com/Phyrozz' target='_blank'>Phyrozz</a></u></b>, or just plain ol' Josh!</p>
              <p>I make full-stack web applications, with experiences on front-end frameworks like React and Angular, and back-end frameworks like Express and Elysia.js.</p>
              <p>I'm still learning a lot about Web Development but I'm definitely pursuing it because I find coding web apps very fun!</p>
              <p>Besides coding, I also cosplay and play drums! :3</p>
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

      <div id="my-skills" className="bg-pink-200">
        <div className="top-0 p-10 flex flex-col justify-center items-center gap-10 min-h-screen">
          <div className="w-full pt-10">
            <h1 className="text-6xl font-patrickhand text-pink-50 drop-shadow-lg text-center font-bold">My Skills</h1>
          </div>
            
          <h2 className="text-pink-50 font-patrickhand text-4xl drop-shadow-lg text-center w-full">Languages</h2>
          <div className="flex flex-row flex-wrap w-full md:gap-10 gap-5 justify-center">
            {sortedLanguageSkills.map(skill => (
              <SkillsContainer key={skill.name} name={skill.name} progress={skill.progress} iconSrc={skill.iconSrc} iconAlt={skill.iconAlt} />
            ))}
          </div>

          <h2 className="text-pink-50 font-patrickhand text-4xl drop-shadow-lg text-center w-full">Frameworks</h2>
          <div className="flex flex-row flex-wrap w-full md:gap-10 gap-5 justify-center">
            {sortedFrameworkSkills.map(skill => (
              <SkillsContainer key={skill.name} name={skill.name} progress={skill.progress} iconSrc={skill.iconSrc} iconAlt={skill.iconAlt} />
            ))}
          </div>

          <h2 className="text-pink-50 font-patrickhand text-4xl drop-shadow-lg text-center w-full">DBMS</h2>
          <div className="flex flex-row flex-wrap w-full md:gap-10 gap-5 justify-center">
            {sortedDBMSSkills.map(skill => (
              <SkillsContainer key={skill.name} name={skill.name} progress={skill.progress} iconSrc={skill.iconSrc} iconAlt={skill.iconAlt} />
            ))}
          </div>
        </div>
      </div>

      <div id="projects" className="bg-pink-200">
        <div className="top-0 p-10 flex flex-col justify-center items-center gap-10 min-h-screen">
          <div className="w-full pt-10">
            <h1 className="text-6xl font-patrickhand text-pink-50 drop-shadow-lg text-center font-bold">Projects</h1>
          </div>

          <div className="flex flex-row flex-wrap w-full md:gap-10 gap-5 justify-center">
            <ProjectsContainer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
