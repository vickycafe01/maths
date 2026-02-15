import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id: string
  email: string
  full_name: string | null
  class: 11 | 12 | null
  phone: string | null
  created_at: string
  updated_at: string
}

export interface Video {
  id: string
  youtube_id: string
  title: string
  description: string | null
  thumbnail_url: string | null
  class: 11 | 12 | null
  chapter: string
  topic: string | null
  duration: number | null
  is_live: boolean
  published_at: string | null
  created_at: string
}

export interface Worksheet {
  id: string
  title: string
  class: 11 | 12
  chapter: string
  type: 'worksheet' | 'test_paper'
  file_url: string
  created_at: string
}

export interface Quiz {
  id: string
  title: string
  class: 11 | 12
  chapter: string
  questions: any
  duration_minutes: number | null
  created_at: string
}

export interface QuizAttempt {
  id: string
  user_id: string
  quiz_id: string
  score: number
  total_questions: number
  answers: any
  completed_at: string
}
