'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { checkLiveStatus, YouTubeVideo } from '@/lib/youtube'
import Link from 'next/link'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

export default function HomePage() {
  const [liveVideo, setLiveVideo] = useState<YouTubeVideo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLiveStream() {
      const live = await checkLiveStatus()
      setLiveVideo(live)
      setLoading(false)
    }
    
    fetchLiveStream()
    
    // Check every 2 minutes for live status
    const interval = setInterval(fetchLiveStream, 120000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Math Coaching
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Free Quality Education for Class 11 & 12 Students
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/videos"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Browse Videos
          </Link>
          <Link
            href="/quiz"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
          >
            Take Quiz
          </Link>
        </div>
      </div>

      {/* Live Stream Section */}
      <div className="max-w-5xl mx-auto mb-16">
        {loading ? (
          <div className="bg-gray-100 animate-pulse h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Checking for live stream...</p>
          </div>
        ) : liveVideo ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-600 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-white rounded-full animate-pulse"></span>
                LIVE NOW
              </div>
              <h2 className="text-2xl font-bold">{liveVideo.snippet.title}</h2>
            </div>
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${liveVideo.id.videoId}`}
                controls
                width="100%"
                height="100%"
                playing
              />
            </div>
            <p className="text-gray-600 mt-4">{liveVideo.snippet.description}</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-12 rounded-lg text-center border-2 border-dashed border-blue-300">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Live Stream Right Now</h3>
            <p className="text-gray-600 mb-6">
              Check back later for live classes or browse our video library
            </p>
            <Link
              href="/videos"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Watch Previous Classes
            </Link>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-600">
          <div className="text-4xl mb-4">🎥</div>
          <h3 className="text-xl font-bold mb-2">Live Classes</h3>
          <p className="text-gray-600">
            Join live interactive sessions with instant doubt clearing
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-purple-600">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-bold mb-2">Video Library</h3>
          <p className="text-gray-600">
            Access chapter-wise organized videos anytime
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-600">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-xl font-bold mb-2">Worksheets & Quizzes</h3>
          <p className="text-gray-600">
            Practice with worksheets and test your knowledge
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-16">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">100+</div>
            <p className="text-blue-100">Students Enrolled</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">50+</div>
            <p className="text-blue-100">Video Lessons</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">100%</div>
            <p className="text-blue-100">Free Forever</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gray-50 p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="text-gray-600 mb-6">
          Join hundreds of students improving their math skills
        </p>
        <Link
          href="/login"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Get Started Free
        </Link>
      </div>
    </div>
  )
}
