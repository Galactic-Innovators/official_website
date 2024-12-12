'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'
import Footer from '@/components/Footer'
const content = {
  en: {
    title: 'Contact Us',
    description: 'If you need any 3D design & printing services, website design & building services',
    email: 'info@gigofficial.com',
    emailButton: 'Send us an email',
    formTitle: 'Please write us a message:',
    namePlaceholder: 'Your name...',
    messagePlaceholder: 'Write your message here...',
    sendMessageButton: 'Send Message',
    missingFieldsAlert: 'Please fill in both your name and message before sending.',
  },
  zh: {
    title: '联系我们',
    description: '如果您需要任何3D设计和打印服务、网站设计和构建服务，请使用以下电子邮件联系我们：',
    email: 'info@gigofficial.com',
    emailButton: '给我们发送电子邮件',
    formTitle: '请给我们留言：',
    namePlaceholder: '您的姓名...',
    messagePlaceholder: '在此处写下您的留言...',
    sendMessageButton: '发送留言',
    missingFieldsAlert: '请填写您的姓名和留言后再发送。',
  },
}

export default function ContactUs() {
  const { language } = useLanguage()
  const text = content[language]
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    if (!name.trim() || !message.trim()) {
      alert(text.missingFieldsAlert)
      return
    }

    const mailtoLink = `mailto:${text.email}?subject=Inquiry from ${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(message)}`
    window.location.href = mailtoLink
  }

  return (
    <main className="min-h-screen">
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          {text.title}
        </h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <p className="text-lg text-gray-700 mb-4">{text.description}</p>
            {/* Method 1: Redirect to send email */}
            {/* <div className="mt-5">
              <a
                href={`mailto:${text.email}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {text.emailButton}
              </a>
            </div> */}
            <div className="mt-8">
              {/* Method 2: Write a message */}
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {text.formTitle}
              </h2>
              <input
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder={text.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
                placeholder={text.messagePlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="mt-4">
                <button
                  onClick={handleSendMessage}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {text.emailButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </main>
  )
}