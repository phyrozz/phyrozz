import React from 'react'
import { Progress } from '@nextui-org/react'

function SkillsContainer({ name, iconSrc, iconAlt, progress }) {
  return (
    <div className="bg-white rounded-xl p-10 shadow-2xl font-patrickhand text-xl grid grid-cols-12 gap-5 md:text-left text-center w-[350px] transition cursor-pointer ease-soft-spring hover:scale-105">
      <div className="col-span-4 flex flex-col justify-center items-center">
        <div className="">
          <img className="w-20 h-20 object-cover" src={`phyrozz/${iconSrc}`} alt={iconAlt} />
        </div>
      </div>
      <div className="col-span-8 flex flex-col gap-5">
        <h1 className="text-3xl font-bold">{name}</h1>
        <Progress color="primary" size="lg" aria-label="Next.js Progress" value={progress} className="w-full" />
      </div>
    </div>
  )
}

export default SkillsContainer