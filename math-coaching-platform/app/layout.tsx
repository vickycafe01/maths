import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Math Coaching Platform - Class 11 & 12',
  description: 'Free math coaching with live classes, video library, worksheets, and quizzes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2026 Math Coaching Platform. All rights reserved.</p>
            <p className="text-sm mt-2">Free education for Class 11 & 12 students</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
