'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    title: 'Galactic Innovators Group',
    subtitle: 'Every idea begins with a spark—a moment of inspiration.',
    description1: 'We bring your imagination to life through 3D printing and thoughtful design.',
    description2: 'With precision and care, we craft products that inspire, innovate, and transform.',
    description3: 'Together, let’s turn your ideas into reality and shape a better tomorrow.',
  },
  zh: {
    title: '星穹创造',
    subtitle: '每一个想法都始于灵感的火花——那一瞬间的闪光。',
    description1: '我们通过3D打印和精心设计将您的想象变为现实。',
    description2: '以精确与细腻打造出能够激励、创新并改变的产品。',
    description3: '让我们一起将您的想法变为现实，共同塑造更美好的未来。',
  },
}

export default function CompanyIntro() {
  const { language } = useLanguage()
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Slow down the video
    }
  }, [])
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Slower stagger for a calm effect
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1, // Slower animation for elegance
      },
    },
  }

  const text = content[language]

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-[#07072b] bg-opacity-75"></div>
      <motion.div
        className="container mx-auto px-4 text-center flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl font-extrabold mb-8 text-gray-200 font-serif"
        >
          {text.title}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-2xl italic mb-8 text-gray-400 font-sans"
        >
          {text.subtitle}
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="text-lg mb-6 leading-relaxed text-gray-300 font-mono"
        >
          {text.description1}
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="text-lg mb-6 leading-relaxed text-gray-300 font-mono"
        >
          {text.description2}
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="text-lg mb-6 leading-relaxed text-gray-300 font-mono"
        >
          {text.description3}
        </motion.p>
      </motion.div>
    </section>
  )
}