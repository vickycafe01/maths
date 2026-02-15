'use client'

import { useEffect, useState } from 'react'
import { supabase, Profile, QuizAttempt } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)

    // Fetch profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileData) {
      setProfile(profileData)
    }

    // Fetch quiz attempts
    const { data: attemptsData } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(10)

    if (attemptsData) {
      setQuizAttempts(attemptsData)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  const averageScore = quizAttempts.length > 0
    ? Math.round(
        quizAttempts.reduce((sum, attempt) => 
          sum + (attempt.score / attempt.total_questions) * 100, 0
        ) / quizAttempts.length
      )
    : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Student Dashboard</h1>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl">
            👤
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile?.full_name || 'Student'}</h2>
            <p className="text-blue-100">{user?.email}</p>
            <p className="text-blue-100">Class {profile?.class || '-'}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-600">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-3xl font-bold text-blue-600">{quizAttempts.length}</div>
          <p className="text-gray-600">Quizzes Completed</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-600">
          <div className="text-3xl mb-2">📊</div>
          <div className="text-3xl font-bold text-green-600">{averageScore}%</div>
          <p className="text-gray-600">Average Score</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-purple-600">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-3xl font-bold text-purple-600">
            {quizAttempts.filter(a => (a.score / a.total_questions) * 100 >= 80).length}
          </div>
          <p className="text-gray-600">High Scores (80%+)</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <Link
            href="/videos"
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center"
          >
            <div className="text-3xl mb-2">🎥</div>
            <p className="font-semibold">Watch Videos</p>
          </Link>
          <Link
            href="/worksheets"
            className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-center"
          >
            <div className="text-3xl mb-2">📝</div>
            <p className="font-semibold">Get Worksheets</p>
          </Link>
          <Link
            href="/quiz"
            className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition text-center"
          >
            <div className="text-3xl mb-2">🎯</div>
            <p className="font-semibold">Take Quiz</p>
          </Link>
          <Link
            href="/"
            className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition text-center"
          >
            <div className="text-3xl mb-2">🔴</div>
            <p className="font-semibold">Live Classes</p>
          </Link>
        </div>
      </div>

      {/* Recent Quiz Attempts */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Recent Quiz Attempts</h3>
        
        {quizAttempts.length > 0 ? (
          <div className="space-y-4">
            {quizAttempts.map(attempt => {
              const percentage = Math.round((attempt.score / attempt.total_questions) * 100)
              const isGood = percentage >= 80
              const isMedium = percentage >= 60 && percentage < 80

              return (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-semibold">Quiz #{attempt.quiz_id.slice(0, 8)}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(attempt.completed_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      isGood ? 'text-green-600' : isMedium ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {attempt.score}/{attempt.total_questions}
                    </div>
                    <p className="text-sm text-gray-600">{percentage}%</p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📝</div>
            <p>No quizzes completed yet</p>
            <Link
              href="/quiz"
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Take Your First Quiz
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
