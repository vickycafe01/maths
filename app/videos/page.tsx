'use client'

import { useEffect, useState } from 'react'
import { getChannelVideos, searchVideos, YouTubeVideo } from '@/lib/youtube'
import Image from 'next/image'

const class11Chapters = [
  'Sets', 'Relations and Functions', 'Trigonometry', 'Complex Numbers',
  'Linear Inequalities', 'Permutations', 'Binomial Theorem', 'Sequences and Series',
  'Straight Lines', 'Conic Sections', 'Limits and Derivatives', 'Statistics', 'Probability'
]

const class12Chapters = [
  'Relations and Functions', 'Inverse Trigonometry', 'Matrices', 'Determinants',
  'Continuity and Differentiability', 'Applications of Derivatives', 'Integrals',
  'Applications of Integrals', 'Differential Equations', 'Vector Algebra',
  '3D Geometry', 'Linear Programming', 'Probability'
]

export default function VideosPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [filteredVideos, setFilteredVideos] = useState<YouTubeVideo[]>([])
  const [selectedClass, setSelectedClass] = useState<11 | 12>(11)
  const [selectedChapter, setSelectedChapter] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true)
      const data = await getChannelVideos()
      setVideos(data)
      setFilteredVideos(data)
      setLoading(false)
    }
    fetchVideos()
  }, [])

  useEffect(() => {
    if (selectedChapter) {
      // Search for videos with the chapter name
      async function searchByChapter() {
        setLoading(true)
        const query = `Class ${selectedClass} ${selectedChapter}`
        const results = await searchVideos(query)
        setFilteredVideos(results)
        setLoading(false)
      }
      searchByChapter()
    } else {
      // Filter by class from title
      const filtered = videos.filter(video =>
        video.snippet.title.includes(`Class ${selectedClass}`)
      )
      setFilteredVideos(filtered.length > 0 ? filtered : videos)
    }
  }, [selectedChapter, selectedClass, videos])

  const chapters = selectedClass === 11 ? class11Chapters : class12Chapters

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Video Library</h1>

      {/* Class Selector */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setSelectedClass(11)
            setSelectedChapter('')
          }}
          className={`px-8 py-3 rounded-lg font-semibold transition ${
            selectedClass === 11
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Class 11
        </button>
        <button
          onClick={() => {
            setSelectedClass(12)
            setSelectedChapter('')
          }}
          className={`px-8 py-3 rounded-lg font-semibold transition ${
            selectedClass === 12
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Class 12
        </button>
      </div>

      {/* Chapter Filter */}
      <div className="mb-8">
        <label className="block text-lg font-semibold mb-3">Select Chapter:</label>
        <select
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
          className="w-full md:w-96 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Chapters</option>
          {chapters.map(chapter => (
            <option key={chapter} value={chapter}>{chapter}</option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
          ))}
        </div>
      )}

      {/* Video Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <div
              key={video.id.videoId}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gray-900">
                <Image
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">
                  {video.snippet.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {video.snippet.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </span>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition"
                  >
                    Watch
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredVideos.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">📹</div>
          <p className="text-xl text-gray-600 mb-2">No videos found</p>
          <p className="text-gray-500">
            Try selecting a different chapter or check back later
          </p>
        </div>
      )}
    </div>
  )
}
