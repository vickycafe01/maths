'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            📐 Math Coaching
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link href="/videos" className="hover:text-blue-200 transition">
              Videos
            </Link>
            <Link href="/worksheets" className="hover:text-blue-200 transition">
              Worksheets
            </Link>
            <Link href="/quiz" className="hover:text-blue-200 transition">
              Quizzes
            </Link>
            {user && (
              <Link href="/dashboard" className="hover:text-blue-200 transition">
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm">{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-lg transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-lg transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden px-4 pb-4">
        <div className="flex flex-col space-y-2">
          <Link href="/" className="hover:text-blue-200 transition">
            Home
          </Link>
          <Link href="/videos" className="hover:text-blue-200 transition">
            Videos
          </Link>
          <Link href="/worksheets" className="hover:text-blue-200 transition">
            Worksheets
          </Link>
          <Link href="/quiz" className="hover:text-blue-200 transition">
            Quizzes
          </Link>
          {user && (
            <Link href="/dashboard" className="hover:text-blue-200 transition">
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
