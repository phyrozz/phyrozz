import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import projects from '../data/projects.json'

function ProjectsContainer() {
  return (
    <div className="md:w-1/2 w-full">
      <Carousel className="bg-pink-50 shadow-2xl p-5 rounded-xl">
        {projects.map((project) => (
          <a href={project.githubLink} target="_blank">
            <img src={project.image} />
            <div className="legend font-patrickhand">
              <p className="text-medium font-bold">{project.name}</p>
              <p>{project.description}</p>
            </div>
          </a>
        ))}
      </Carousel>
    </div>
  )
}

export default ProjectsContainer