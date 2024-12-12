'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '@/contexts/LanguageContext'

const content = {
  en: {
    title: 'Galactic Innovators Group',
    subtitle: '"Inspiration often flashes by, but is rarely realized"',
    description1: 'Thus, Galactic Innovators Group was born (born in time)',
    description2: 'Galactic Innovators Group (GIG for short) is mainly engaged in realizing personalized 3D printing products for users. At the same time, we can also realize customized accessories, decorations, etc., and can choose materials such as PLA and wood.',
    description3: 'We are a bunch of enthusiasts with the goal of helping creators/innovators to achieve their dreams. We wish to create new possibilities and chances for better changes while enhancing the quality of living by making innovative products open to the public.',
    description4: 'Everything in this world is created by someone or something, and there is no reason why something cannot be made. That is why we accept all and every idea/dream so there is a chance to refine it, make it better, or turn it into reality. We want to make this world a better place by creating innovative products/ideas.',
  },
  zh: {
    title: '星穹创造',
    subtitle: '"灵感有时总是一闪而过，却鲜少把它实现"',
    description1: '由此，星穹创造就此诞生（应时而生）',
    description2: '星穹创造（英文，简称：GIG）是以实现用户个性化3D打印产品为主营业务。同时，我们也可以实现定制配件，配饰等，并且可选择pla，木制等材料。',
    description3: '我们是一群热衷于帮助创造者/创新者实现梦想的人。我们希望通过将创新产品开放给公众，创造新的可能性和机会，以促进更好的变革，同时提高生活质量。',
    description4: '这个世界上的一切都是由某人或某事创造的，没有理由不能制造某些东西。这就是为什么我们接受所有的想法/梦想，这样就有机会完善它，让它变得更好，或者把梦想变成现实。我们希望通过创造创新产品/创意来让这个世界变得更美好。',
  },
}

export default function CompanyIntro() {
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
        staggerChildren: 0.1,
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
    <section ref={ref} className="py-20 bg-gray-100">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-6 text-center">
          {text.title}
        </motion.h1>
        <motion.p variants={itemVariants} className="text-xl mb-6 text-center">
          {text.subtitle}
        </motion.p>
        <motion.p variants={itemVariants} className="text-lg mb-6">
          {text.description1}
        </motion.p>
        <motion.p variants={itemVariants} className="text-lg mb-6">
          {text.description2}
        </motion.p>
        <motion.p variants={itemVariants} className="text-lg mb-6">
          {text.description3}
        </motion.p>
        <motion.p variants={itemVariants} className="text-lg mb-6">
          {text.description4}
        </motion.p>
      </motion.div>
    </section>
  )
}

