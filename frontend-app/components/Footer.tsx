'use client'

import { FaWeixin, FaInstagram, FaEnvelope, FaTiktok } from 'react-icons/fa'
import { SiXiaohongshu } from 'react-icons/si'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import wechat_qr from '@/public/images/wechat_qr_code.jpg'

const content = {
  en: {
    mediaCoverage: 'Media Coverage',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    allRightsReserved: 'All rights reserved.',
  },
  zh: {
    mediaCoverage: '媒体覆盖',
    termsOfService: '服务条款',
    privacyPolicy: '隐私政策',
    allRightsReserved: '版权所有。',
  },
}

export default function Footer() {
  const { language } = useLanguage()
  const text = content[language]

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">{text.mediaCoverage}</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-gray-400"><SiXiaohongshu /></a>
              <a href="#" className="text-2xl hover:text-gray-400 relative group">
                <FaWeixin />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-[90vw] h-[90vw] max-w-[150px] max-h-[150px]">
                  <Image 
                    src={wechat_qr} 
                    alt="WeChat QR Code" 
                    layout="fill" 
                    objectFit="contain"
                    className="rounded-md" 
                  />
                </div>
              </a>
              <a href="https://www.instagram.com/galactic_innovators?igsh=NzZua2thNm85Y3Q0" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-400">
                <FaInstagram />
              </a>
              <a href="mailto:info@gigofficial.com" className="text-2xl hover:text-gray-400">
                <FaEnvelope />
              </a>
              <a href="#" className="text-2xl hover:text-gray-400"><FaTiktok /></a>
            </div>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center">
            <p>&copy; 2024 Galactic Innovators Group {text.allRightsReserved}</p>
          </div>
          <div className="w-full md:w-1/3 text-right">
            <a href="#" className="block mb-2 hover:text-gray-400">{text.termsOfService}</a>
            <a href="#" className="block hover:text-gray-400">{text.privacyPolicy}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

