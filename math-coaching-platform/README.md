# Math Coaching Platform 📐

A complete free math coaching platform for Class 11 & 12 students with live streaming, video library, worksheets, quizzes, and ERP system.

## Features

- 🎥 **Live Streaming** - YouTube integration for live classes
- 📚 **Video Library** - Chapter-wise organized video content
- 📝 **Worksheets & Tests** - Download study materials
- 🎯 **Quiz System** - Interactive quizzes with score tracking
- 👤 **Student Dashboard** - Track progress and performance
- 💼 **ERP System** - Student management and analytics
- 📧 **Mailbox** - Internal messaging system

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **APIs**: YouTube Data API v3
- **Deployment**: Vercel (Free)
- **Cost**: 100% FREE for 100+ students

## Quick Start

### 1. Prerequisites

- Node.js 18+ installed
- Supabase account (free)
- YouTube channel with API access
- Vercel account (free)

### 2. Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to SQL Editor and run the database schema:

\`\`\`sql
-- Users Table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  class INTEGER CHECK (class IN (11, 12)),
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Videos Table
CREATE TABLE public.videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  youtube_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  class INTEGER CHECK (class IN (11, 12)),
  chapter TEXT NOT NULL,
  topic TEXT,
  duration INTEGER,
  is_live BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Worksheets Table
CREATE TABLE public.worksheets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  class INTEGER CHECK (class IN (11, 12)),
  chapter TEXT NOT NULL,
  type TEXT CHECK (type IN ('worksheet', 'test_paper')),
  file_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quizzes Table
CREATE TABLE public.quizzes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  class INTEGER CHECK (class IN (11, 12)),
  chapter TEXT NOT NULL,
  questions JSONB NOT NULL,
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz Attempts Table
CREATE TABLE public.quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages Table (Mailbox)
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  to_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements Table
CREATE TABLE public.announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  target_class INTEGER CHECK (target_class IN (11, 12)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worksheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Videos are viewable by everyone"
ON public.videos FOR SELECT USING (true);

CREATE POLICY "Worksheets are viewable by everyone"
ON public.worksheets FOR SELECT USING (true);

CREATE POLICY "Quizzes are viewable by everyone"
ON public.quizzes FOR SELECT USING (true);

CREATE POLICY "Users can view own quiz attempts"
ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz attempts"
ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own messages"
ON public.messages FOR SELECT USING (auth.uid() = to_user_id OR auth.uid() = from_user_id);

CREATE POLICY "Announcements are viewable by everyone"
ON public.announcements FOR SELECT USING (true);
\`\`\`

3. Create Storage Bucket for worksheets:
   - Go to Storage → Create bucket → Name: "worksheets"
   - Make it public

4. Get your credentials from Settings → API:
   - Project URL
   - Anon/Public key

### 3. Setup YouTube API

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project
3. Enable "YouTube Data API v3"
4. Create credentials → API Key
5. Get your YouTube Channel ID from your channel URL

### 4. Local Development

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd math-coaching-platform

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local with your credentials
# Then start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Deploy to Vercel

#### Option A: Using Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
\`\`\`

#### Option B: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - \`NEXT_PUBLIC_SUPABASE_URL\`
   - \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`
   - \`NEXT_PUBLIC_YOUTUBE_API_KEY\`
   - \`NEXT_PUBLIC_YOUTUBE_CHANNEL_ID\`
6. Click "Deploy"

Your site will be live in 2-3 minutes at \`your-project.vercel.app\`!

## Project Structure

\`\`\`
math-coaching-platform/
├── app/
│   ├── page.tsx                 # Home page with live stream
│   ├── videos/page.tsx          # Video library
│   ├── worksheets/page.tsx      # Worksheets & test papers
│   ├── quiz/page.tsx            # Quiz system
│   ├── dashboard/page.tsx       # Student dashboard
│   ├── login/page.tsx           # Authentication
│   └── layout.tsx               # Root layout
├── components/
│   └── Navbar.tsx               # Navigation component
├── lib/
│   ├── supabase.ts              # Supabase client
│   └── youtube.ts               # YouTube API functions
├── public/                       # Static assets
└── package.json
\`\`\`

## Usage

### For Students

1. Sign up with email and password
2. Browse video library by class and chapter
3. Download worksheets and test papers
4. Take quizzes and track your progress
5. Watch live classes when available

### For Admin (You)

1. Upload videos to your YouTube channel
2. Organize videos with consistent naming: "Class 11 - Chapter Name - Topic"
3. Upload worksheets to Supabase Storage via admin panel
4. Create quizzes in the database
5. Go live on YouTube - it will automatically show on the homepage!

## Customization

### Adding New Chapters

Edit the chapter lists in:
- \`app/videos/page.tsx\`
- \`app/worksheets/page.tsx\`
- \`app/quiz/page.tsx\`

### Styling

Tailwind CSS classes can be modified in any component file. Main colors are defined in \`tailwind.config.js\`.

## Support

For issues or questions:
- Check Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Check Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
- YouTube API docs: [developers.google.com/youtube](https://developers.google.com/youtube)

## License

This project is open source and available for educational purposes.

---

Built with ❤️ for free math education
