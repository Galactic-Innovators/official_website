'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
  const [showVideo, setShowVideo] = useState(false)

  const text = content[language]

  return (
    <section
      className={`relative h-[60vh] w-full overflow-hidden ${
        !showVideo ? 'bg-black' : ''
      }`}
    >
      {/* Show video only after sentences are fully displayed */}
      {showVideo && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-black">
        {!showVideo && (
          <div className="absolute top-0 left-0 w-full h-full bg-black"></div> // Placeholder
        )}
        <iframe
          className={`absolute top-[-20%] left-0 w-full h-[140%] object-cover ${
            showVideo ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500`}
          src="https://www.youtube.com/embed/UMWSKmQte3w?autoplay=1&mute=1&loop=1&playlist=UMWSKmQte3w&controls=0&modestbranding=1&iv_load_policy=3&fs=0"
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; loop; encrypted-media"
          onLoad={() => setShowVideo(true)} // Show video after it's loaded
        ></iframe>
      </div>
      )}

      {/* Overlay */}
      {showVideo && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-8 font-serif"
        >
          {text.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-2xl italic mb-8 font-sans"
        >
          {text.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            onComplete: () => setShowVideo(true), // Show video after this animation completes
          }}
        >
          <p className="text-lg mb-6 leading-relaxed">{text.description1}</p>
          <p className="text-lg mb-6 leading-relaxed">{text.description2}</p>
          <p className="text-lg mb-6 leading-relaxed">{text.description3}</p>
        </motion.div>
      </div>
    </section>
  )
}