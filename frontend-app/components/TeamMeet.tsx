'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import Acacia from "@/public/images/Acacia.jpg";
import Kevin from "@/public/images/Kevin.jpg";
import Eric from "@/public/images/Eric.jpg";
import Anny from "@/public/images/Anny.jpg";
import Clyde from "@/public/images/Clyde.jpg";
import Cycas from "@/public/images/Cycas.jpg";
import Ying from "@/public/images/Ying.jpg";
import Oliver from "@/public/images/Oliver.jpg";
import Imran from "@/public/images/Imran.jpg";
import Jeremy from "@/public/images/Jeremy.jpg";

const content = {
  en: {
    title: 'Meet Our Team',
    teamMembers: [
      { name: 'Jeremy Cheung', role: 'Founder, 3D Designer & 3D Printing Specialist', image: Jeremy, linkedin: 'https://www.linkedin.com/in/jeremyc1231/' },
      { name: 'Kevin Chen', role: 'Full-stack Developer', image: Kevin, linkedin: 'https://www.linkedin.com/in/kevinchenzk/' },
      { name: 'Anny Liu', role: 'Marketing Specialist', image: Anny },
      { name: 'Eric Li', role: '3D Designer & Full-stack Developer', image: Eric, linkedin: 'https://www.linkedin.com/in/ericxuchengli/' },
      { name: 'Cycas', role: 'Full-stack Developer', image: Cycas },
      { name: "Imran Malik", role: "3D Designer", image: Imran },
      { name: "Oliver Chen", role: "3D Designer", image: Oliver },
      { name: "Acacia Hong", role: "Graphic Designer", image: Acacia, linkedin: 'https://www.linkedin.com/in/acacia-hong-827239109/' },
      { name: "Ying Xiao", role: "UX Designer", image: Ying },
    ],
    viewProfile: 'Click to view full profile',
  },
  zh: {
    title: '认识我们的团队',
    teamMembers: [
      { name: 'Jeremy Cheung', role: '创始人、3D 设计师和 3D 打印专家', image: Jeremy, linkedin: 'https://www.linkedin.com/in/jeremyc1231/' },
      { name: 'Kevin Chen', role: '全栈开发人员', image: Kevin, linkedin: 'https://www.linkedin.com/in/kevinchenzk/' },
      { name: 'Anny Liu', role: '营销专家', image: Anny },
      { name: 'Eric Li', role: '3D 设计师和全栈开发人员', image: Eric, linkedin: 'https://www.linkedin.com/in/ericxuchengli/' },
      { name: 'Cycas', role: '全栈开发人员', image: Cycas },
      { name: "Imran Malik", role: "3D 设计师", image: Imran },
      { name: "Oliver Chen", role: "3D 设计师", image: Oliver },
      { name: "Acacia Hong", role: "平面设计师", image: Acacia, linkedin: 'https://www.linkedin.com/in/acacia-hong-827239109/' },
      { name: "Ying Xiao", role: "UX 设计师", image: Ying },
    ],
    viewProfile: '点击查看完整简介',
  },
}

export default function TeamMeet() {
  const { language } = useLanguage()
  const text = content[language]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">{text.title}</h2>
        <div className="flex flex-wrap justify-center">
          {text.teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="m-4 text-center group"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full overflow-hidden">
                <img
                  src={member.image.src}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
              {member.linkedin && (
                <motion.div
                  className="mt-2 text-sm hidden group-hover:block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-sm"
                  >
                    {text.viewProfile}
                  </a>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}