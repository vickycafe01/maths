'use client'

import { useEffect, useState } from 'react'
import { supabase, Worksheet } from '@/lib/supabase'

export default function WorksheetsPage() {
  const [worksheets, setWorksheets] = useState<Worksheet[]>([])
  const [selectedClass, setSelectedClass] = useState<11 | 12>(11)
  const [selectedType, setSelectedType] = useState<'all' | 'worksheet' | 'test_paper'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorksheets()
  }, [selectedClass, selectedType])

  async function fetchWorksheets() {
    setLoading(true)
    
    let query = supabase
      .from('worksheets')
      .select('*')
      .eq('class', selectedClass)
      .order('created_at', { ascending: false })

    if (selectedType !== 'all') {
      query = query.eq('type', selectedType)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching worksheets:', error)
    } else {
      setWorksheets(data || [])
    }
    
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Worksheets & Test Papers</h1>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Class Selector */}
        <div>
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

        {/* Type Filter */}
        <div>
          <label className="block text-lg font-semibold mb-3">Filter by Type:</label>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                selectedType === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType('worksheet')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                selectedType === 'worksheet'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Worksheets
            </button>
            <button
              onClick={() => setSelectedType('test_paper')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                selectedType === 'test_paper'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Test Papers
            </button>
          </div>
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

      {/* Worksheets Grid */}
      {!loading && worksheets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {worksheets.map(worksheet => (
            <div
              key={worksheet.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">
                  {worksheet.type === 'worksheet' ? '📝' : '📄'}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  worksheet.type === 'worksheet'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {worksheet.type === 'worksheet' ? 'Worksheet' : 'Test Paper'}
                </span>
              </div>
              
              <h3 className="font-bold text-lg mb-2">{worksheet.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                Chapter: <span className="font-semibold">{worksheet.chapter}</span>
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {new Date(worksheet.created_at).toLocaleDateString()}
                </span>
                <a
                  href={worksheet.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && worksheets.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-xl text-gray-600 mb-2">No worksheets available yet</p>
          <p className="text-gray-500">
            Check back soon for new study materials
          </p>
        </div>
      )}
    </div>
  )
}
