import React from 'react'
import IntroHeader from './components/intro-header'
import Navbar from './components/navbar'
import skills from "./data/skills.json"
import SkillsContainer from './components/skills-container'
import MzkiChibi from './components/mzki-chibi'
import ProjectsContainer from './components/projects-container'
import AboutMe from './components/about-me'

function App() {
  const [text, setText] = React.useState("Hi!")
  const [aboutMeText, setAboutMeText] = React.useState(
    <p>Hi! I'm <b>Joshua Malabanan</b>, but you can call me Reimu, <b><u><a href='https://www.youtube.com/Phyrozz' target='_blank'>Phyrozz</a></u></b>, or just plain ol' Josh!</p>
  )

  React.useEffect(() => {
    // scroll to top when the page is refreshed
    window.history.scrollRestoration = 'manual'

    const handleScroll = () => {
      const viewportHeight = window.innerHeight
      const scrollPosition = window.scrollY
      const totalHeight = document.documentElement.scrollHeight
      
      // Calculate scroll percentage (0 to 100)
      const scrollPercentage = (scrollPosition / (totalHeight - viewportHeight)) * 100

      // Use percentage-based thresholds
      const threshold1 = 15  // 15% of total scroll
      const threshold2 = 30  // 30% of total scroll
      const threshold3 = 45  // 45% of total scroll
      const threshold4 = 60  // 60% of total scroll
      const threshold5 = 75  // 75% of total scroll

      // for the intro header
      if (scrollPercentage >= threshold1 && scrollPercentage < threshold2) {
        setText('I am Joshua Malabanan')
      } else if (scrollPercentage >= threshold2) {
        setText('and I am a Junior Web Developer!')
      } else {
        setText('Hi!')
      }

      // for the about me section
      if (scrollPercentage >= threshold5) {
        setAboutMeText(
          <p>Besides coding, I also cosplay and play drums! :3</p>
        )
      } else if (scrollPercentage >= threshold4) {
        setAboutMeText(
          <p>I'm still learning a lot about Web Development but I'm definitely pursuing it because I find coding web apps very fun!</p>
        )
      } else if (scrollPercentage >= threshold3) {
        setAboutMeText(
          <p>I develop full-stack web applications, with experiences on front-end frameworks like React and Angular, and back-end frameworks like Express and Elysia.js.</p>
        )
      } else {
        setAboutMeText(
          <p>Hi! I'm <b>Joshua Malabanan</b>, but you can call me Reimu, <b><u><a href='https://www.youtube.com/Phyrozz' target='_blank'>Phyrozz</a></u></b>, or just plain ol' Josh!</p>
        )
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
      <div className="font-patrickhand h-[700vh]">
        <IntroHeader text={text} />
      </div>

      <div id="about-me" className="bg-pink-200 h-[750vh]">
        <div className="sticky top-0 h-screen md:p-10 p-5 flex flex-col justify-center items-center gap-10">
          <div className="w-full">
            <h1 className="md:text-6xl text-4xl font-patrickhand text-pink-50 drop-shadow-lg text-center font-bold">About Me</h1>
          </div>

          <AboutMe text={aboutMeText} />
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
            <h1 className="md:text-6xl text-4xl md:h-full h-2 font-patrickhand text-pink-50 drop-shadow-lg text-center font-bold">My Skills</h1>
          </div>
            
          <h2 className="text-pink-50 md:h-full h-4 font-patrickhand md:text-4xl text-2xl drop-shadow-lg text-center w-full">Languages</h2>
          <div className="flex flex-row flex-wrap w-full md:gap-10 gap-5 justify-center">
            {sortedLanguageSkills.map(skill => (
              <SkillsContainer key={skill.name} name={skill.name} progress={skill.progress} iconSrc={skill.iconSrc} iconAlt={skill.iconAlt} />
            ))}
          </div>

          <h2 className="text-pink-50 md:h-full h-4 font-patrickhand md:text-4xl text-2xl drop-shadow-lg text-center w-full">Frameworks</h2>
          <div className="flex flex-row flex-wrap w-full md:gap-10 gap-5 justify-center">
            {sortedFrameworkSkills.map(skill => (
              <SkillsContainer key={skill.name} name={skill.name} progress={skill.progress} iconSrc={skill.iconSrc} iconAlt={skill.iconAlt} />
            ))}
          </div>

          <h2 className="text-pink-50 md:h-full h-4 font-patrickhand md:text-4xl text-2xl drop-shadow-lg text-center w-full">DBMS</h2>
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
            <h1 className="md:text-6xl text-4xl font-patrickhand text-pink-50 drop-shadow-lg text-center font-bold">Projects</h1>
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
