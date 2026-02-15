'use client'

import { useEffect, useState } from 'react'
import { supabase, Quiz } from '@/lib/supabase'
import Link from 'next/link'

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [selectedClass, setSelectedClass] = useState<11 | 12>(11)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQuizzes()
  }, [selectedClass])

  async function fetchQuizzes() {
    setLoading(true)
    
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('class', selectedClass)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching quizzes:', error)
    } else {
      setQuizzes(data || [])
    }
    
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Practice Quizzes</h1>

      {/* Class Selector */}
      <div className="mb-8">
        <label className="block text-lg font-semibold mb-3">Select Class:</label>
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedClass(11)}
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              selectedClass === 11
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Class 11
          </button>
          <button
            onClick={() => setSelectedClass(12)}
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              selectedClass === 12
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Class 12
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-48"></div>
          ))}
        </div>
      )}

      {/* Quizzes Grid */}
      {!loading && quizzes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map(quiz => {
            const questionCount = Array.isArray(quiz.questions) 
              ? quiz.questions.length 
              : JSON.parse(quiz.questions || '[]').length

            return (
              <div
                key={quiz.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-xl mb-2">{quiz.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Chapter: <span className="font-semibold">{quiz.chapter}</span>
                </p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>📝</span>
                    <span>{questionCount} Questions</span>
                  </div>
                  {quiz.duration_minutes && (
                    <div className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{quiz.duration_minutes} min</span>
                    </div>
                  )}
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition">
                  Start Quiz
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && quizzes.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-xl text-gray-600 mb-2">No quizzes available yet</p>
          <p className="text-gray-500 mb-6">
            Quizzes will be added soon to help you practice
          </p>
          <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg max-w-2xl mx-auto">
            <h3 className="font-bold text-lg mb-2">Coming Soon!</h3>
            <p className="text-gray-700">
              Interactive quizzes with instant feedback, score tracking, and chapter-wise practice tests
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
