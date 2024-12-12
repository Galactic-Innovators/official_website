'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    title: 'Galactic Innovators Group',
    subtitle: 'Every idea begins with a spark—a moment of inspiration.',
    description1: 'We bring your imagination to life through 3D printing and thoughtful design.',
    description2: 'With precision and care, we craft products that inspire, innovate, and transform.',
    description3: 'Together, let\'s turn your ideas into reality and shape a better tomorrow.',
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
  const [showVideo, setShowVideo] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const text = content[language]

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {showVideo && (
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/UMWSKmQte3w?autoplay=1&mute=1&loop=1&playlist=UMWSKmQte3w&controls=0&modestbranding=1&iv_load_policy=3&fs=0"
            title="YouTube video player"
            allow="autoplay; loop; encrypted-media"
            onLoad={() => setShowVideo(true)}
          ></iframe>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      )}

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-8 font-serif"
        >
          {text.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-xl sm:text-2xl md:text-3xl italic mb-4 md:mb-8 font-sans"
        >
          {text.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            onComplete: () => setShowVideo(true),
          }}
          className="space-y-2 md:space-y-4 max-w-2xl mx-auto"
        >
          {[text.description1, text.description2, text.description3].map((desc, index) => (
            <p key={index} className="text-sm sm:text-base md:text-lg leading-relaxed">
              {desc}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

