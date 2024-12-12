'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    title: 'Showcases',
    showcases: [
      { title: "Jeremy CTR's Front License Plate Adaptor", image: '/placeholder.svg?height=400&width=600' },
      { title: "Eric's Telescope", image: '/placeholder.svg?height=400&width=600' },
      { title: "Imran's CTR side fin/Cancards", image: '/placeholder.svg?height=400&width=600' },
      { title: "Jeremy's 6-Speed transmission model", image: '/placeholder.svg?height=400&width=600' },
    ],
  },
  zh: {
    title: '产品展示',
    showcases: [
      { title: "Jeremy CTR的前车牌适配器", image: '/placeholder.svg?height=400&width=600' },
      { title: "Eric的望远镜", image: '/placeholder.svg?height=400&width=600' },
      { title: "Imran的CTR侧鳍/Cancards", image: '/placeholder.svg?height=400&width=600' },
      { title: "Jeremy的6速变速器模型", image: '/placeholder.svg?height=400&width=600' },
    ],
  },
}

export default function Showcases() {
  const { language } = useLanguage()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const text = content[language]

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">{text.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {text.showcases.map((showcase, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Image
                src={showcase.image}
                alt={showcase.title}
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-white text-xl font-semibold text-center px-4">
                  {showcase.title}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

