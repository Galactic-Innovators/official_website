'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import refractor_image from '@/public/images/60mm_refractor.jpg'
import display_stand_image from '@/public/images/display_stand.png'
import scanner_image from '@/public/images/scanner.jpg'
import wukong_image from '@/public/images/wukong.png'
const content = {
  en: {
    title: 'Showcases',
    showcases: [
      { title: "Black Myth: Wukong, the Golden Cudgel", image:wukong_image },
      { title: "60mm Refractor", image: refractor_image },
      { title: "Display stand", image: display_stand_image},
      { title: "3D Scanner", image: scanner_image },
    ],
  },
  zh: {
    title: '产品展示',
    showcases: [
      { title: "黑神话悟空： 如意金箍棒", image: wukong_image},
      { title: "60mm 折射镜", image: refractor_image },
      { title: "展示架", image: display_stand_image },
      { title: "3D 扫描仪", image: scanner_image},
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

