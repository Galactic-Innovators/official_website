'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import gig_logo from '@/public/images/GIG_Logo_Trans.png'
const content = {
  en: {
    home: 'Home',
    aboutUs: 'About Us',
    products: 'Products',
    contact: 'Contact Us',
  },
  zh: {
    home: '首页',
    aboutUs: '关于我们',
    products: '产品',
    contact: '联系我们',
  },
}

function Header() {
  const { language, toggleLanguage } = useLanguage()
  const text = content[language]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src={gig_logo}
            alt="GIG Logo"
            width={40}
            height={100}
            className="header-logo"
          />
        </Link>

        <nav className="hidden md:flex space-x-6">
          {/* <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
            {text.home}
          </Link> */}
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
            {text.aboutUs}
          </Link>
          {/* <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
            {text.products}
          </Link> */}
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
            {text.contact}
          </Link>
        </nav>

        <button
          onClick={toggleLanguage}
          className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200"
        >
          {language === 'en' ? '中文' : 'English'}
        </button>
      </div>
    </header>
  )
}

export default Header

