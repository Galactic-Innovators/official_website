'use client'

import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    title: 'Brand Features',
    features: [
      { title: 'Innovation', description: 'Pushing boundaries in 3D printing' },
      { title: 'Customization', description: 'Tailored solutions for every need' },
      { title: 'Service', description: 'Exceptional support throughout the process' },
    ],
  },
  zh: {
    title: '品牌特色',
    features: [
      { title: '创新（创造）', description: '推动3D打印的边界' },
      { title: '定制', description: '为每一个需求量身定制解决方案' },
      { title: '服务', description: '全程提供卓越支持' },
    ],
  },
}

export default function BrandFeatures() {
  const { language } = useLanguage()
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const text = content[language]

  return (
    <section ref={ref} className="py-20 bg-white">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-10 text-center">
          {text.title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {text.features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-100 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

