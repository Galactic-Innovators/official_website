'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    title: 'Meet Our Team',
    teamMembers: [
      { name: 'Eric Li', role: 'Founder' },
      { name: 'Jeremy Cheung', role: 'Co-founder' },
      { name: 'Kevin C', role: 'Designer' },
      { name: 'Anny Liu', role: 'Marketing' },
      { name: 'Cycas', role: 'Engineer' },
    ],
    viewProfile: 'Click to view full profile',
  },
  zh: {
    title: '认识我们的团队',
    teamMembers: [
      { name: 'Eric Li', role: '创始人' },
      { name: 'Jeremy Cheung', role: '联合创始人联合创始人' },
      { name: 'Kevin C', role: '设计师' },
      { name: 'Anny Liu', role: '市场营销' },
      { name: 'Cycas', role: '工程师' },
    ],
    viewProfile: '点击查看完整简介',
  },
}

export default function TeamMeet() {
  const { language } = useLanguage()
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)

  const text = content[language]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">{text.title}</h2>
        <div className="flex flex-wrap justify-center">
          {text.teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="m-4 text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => setHoveredMember(index)}
              onHoverEnd={() => setHoveredMember(null)}
            >
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full overflow-hidden">
                <img
                  src={`/placeholder.svg?height=128&width=128&text=${member.name}`}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
              {hoveredMember === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm"
                >
                  {text.viewProfile}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

