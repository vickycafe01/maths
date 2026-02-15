# 🚀 Complete Deployment Guide - Math Coaching Platform

## Step-by-Step Deployment to Vercel

### Prerequisites Checklist
- [ ] Supabase account created
- [ ] Database schema executed
- [ ] YouTube API key obtained
- [ ] GitHub account ready
- [ ] Vercel account created

---

## Part 1: Supabase Setup (15 minutes)

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project" → Sign in with GitHub
3. Click "New Project"
4. Fill in details:
   - **Name**: math-coaching
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to India (Singapore or Mumbai)
   - **Plan**: Free
5. Click "Create new project"
6. Wait 2-3 minutes for setup

### Step 2: Setup Database

1. In your Supabase dashboard, click "SQL Editor" (left sidebar)
2. Click "New query"
3. Copy the ENTIRE SQL from README.md (from CREATE TABLE to all POLICY statements)
4. Paste into the editor
5. Click "Run" (or press Ctrl/Cmd + Enter)
6. You should see "Success. No rows returned"

### Step 3: Create Storage Bucket

1. Click "Storage" in left sidebar
2. Click "New bucket"
3. **Name**: worksheets
4. **Public bucket**: Toggle ON
5. Click "Create bucket"

### Step 4: Get API Credentials

1. Click "Settings" (gear icon) → "API"
2. Copy these values (save in a text file):
   ```
   Project URL: https://xxxxx.supabase.co
   anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

✅ **Supabase is now ready!**

---

## Part 2: YouTube API Setup (10 minutes)

### Step 1: Create Google Cloud Project

1. Go to https://console.cloud.google.com
2. Click project dropdown (top) → "New Project"
3. **Project name**: Math Coaching Platform
4. Click "Create"
5. Wait for notification "Project created"

### Step 2: Enable YouTube Data API

1. Click "APIs & Services" → "Library"
2. Search for "YouTube Data API v3"
3. Click on it → Click "Enable"
4. Wait for "API enabled"

### Step 3: Create API Credentials

1. Click "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. **Copy the API key** (save it!)
4. Click "Restrict Key" (recommended):
   - Under "API restrictions" → Select "Restrict key"
   - Check only "YouTube Data API v3"
   - Click "Save"

### Step 4: Get Your YouTube Channel ID

1. Go to https://youtube.com
2. Click your profile icon → "Your channel"
3. Look at the URL:
   - If it's `youtube.com/channel/UCxxxxxx` → Copy the `UCxxxxxx` part
   - If it's `youtube.com/@yourname` → Click "Customize channel" → Look for Channel ID

✅ **YouTube API is configured!**

---

## Part 3: Push Code to GitHub (5 minutes)

### Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click "+" → "New repository"
3. **Repository name**: math-coaching-platform
4. **Description**: Free math coaching for Class 11 & 12
5. **Visibility**: Public or Private (your choice)
6. **Don't initialize** with README (we already have one)
7. Click "Create repository"

### Step 2: Push Your Code

Copy the project folder to your local machine, then:

```bash
# Open terminal in project folder
cd math-coaching-platform

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Math Coaching Platform"

# Add GitHub remote (replace with YOUR repository URL)
git remote add origin https://github.com/YOUR-USERNAME/math-coaching-platform.git

# Push to GitHub
git branch -M main
git push -u origin main
```

✅ **Code is on GitHub!**

---

## Part 4: Deploy to Vercel (10 minutes)

### Step 1: Connect Vercel to GitHub

1. Go to https://vercel.com
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel to access your repositories

### Step 2: Import Your Project

1. Click "Add New..." → "Project"
2. Find "math-coaching-platform" in the list
3. Click "Import"

### Step 3: Configure Project

1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: ./ (default)
3. **Build Command**: next build (default)
4. **Output Directory**: .next (default)

### Step 4: Add Environment Variables

Click "Environment Variables" and add these 4 variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `NEXT_PUBLIC_YOUTUBE_API_KEY` | Your YouTube API key |
| `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` | Your YouTube channel ID |

Make sure to add them for:
- ✅ Production
- ✅ Preview  
- ✅ Development

### Step 5: Deploy!

1. Click "Deploy"
2. Wait 2-3 minutes...
3. You'll see "Congratulations!" with your live URL

### Step 6: Get Your Live URL

Your site is now live at:
```
https://math-coaching-platform.vercel.app
```
(or a similar URL)

Click "Visit" to see your platform!

✅ **YOUR PLATFORM IS LIVE!** 🎉

---

## Part 5: Test Your Platform

### Things to Test:

1. **Homepage**
   - Should load without errors
   - Live stream section shows "No live stream" (unless you're actually live)

2. **Sign Up**
   - Go to /login
   - Create a test account
   - Check email for verification (if Supabase email is enabled)

3. **Videos Page**
   - Should show your YouTube videos (if any)
   - Class selector works
   - Chapter filter works

4. **Worksheets**
   - Page loads (will be empty until you upload)

5. **Quiz**
   - Page loads (will be empty until you create quizzes)

6. **Dashboard**
   - After login, dashboard shows your profile
   - Stats are 0 initially

---

## Part 6: Going Live (First Time)

### When You Want to Stream:

1. Open YouTube Studio
2. Click "Create" → "Go live"
3. Setup your stream
4. **Start streaming**
5. Your platform homepage will automatically detect it within 2 minutes!
6. Students will see "🔴 LIVE NOW" with your stream

### When You End Stream:

- Homepage automatically updates to "No live stream right now"
- Stream is saved as a video in your channel
- Students can watch it anytime in the Video Library

---

## Troubleshooting

### Issue: "Failed to fetch videos"
**Solution**: Check your YouTube API key and Channel ID in Vercel environment variables

### Issue: "Supabase error"
**Solution**: Verify Supabase URL and key are correct, check database policies are created

### Issue: "Can't sign up"
**Solution**: 
1. Go to Supabase → Authentication → Providers
2. Make sure Email provider is enabled
3. Disable email confirmation for testing (Settings → Auth → Enable email confirmations = OFF)

### Issue: Site not updating after code changes
**Solution**:
1. Push new code to GitHub
2. Vercel automatically deploys (takes 2-3 minutes)
3. Or manually trigger deploy in Vercel dashboard

### Issue: Environment variables not working
**Solution**:
1. Double-check spelling (they're case-sensitive!)
2. Must start with `NEXT_PUBLIC_` to work in browser
3. After changing, click "Redeploy" in Vercel

---

## Next Steps

### 1. Upload Your First Video
- Make a test video
- Upload to YouTube
- Title it: "Class 11 - Sets - Introduction"
- It will appear in your Video Library!

### 2. Create Test Worksheet
Use Supabase dashboard:
1. Go to Table Editor → worksheets
2. Click "Insert row"
3. Fill in:
   - title: "Sets Practice Problems"
   - class: 11
   - chapter: "Sets"
   - type: "worksheet"
   - file_url: (upload PDF to Storage first, then paste URL)

### 3. Share with Students
Send them your Vercel URL:
```
https://your-project.vercel.app
```

Students can:
- Sign up for free
- Watch videos
- Download worksheets  
- Join live classes

---

## Cost Breakdown

| Service | Usage | Cost |
|---------|-------|------|
| Vercel | 100GB bandwidth/month | $0 |
| Supabase | 500MB database, 1GB storage | $0 |
| YouTube API | 10,000 requests/day | $0 |
| **TOTAL** | **Supporting 100+ students** | **$0/month** |

---

## Custom Domain (Optional)

Want your own domain like `mathcoaching.com`?

1. Buy domain from Namecheap/GoDaddy (~$10/year)
2. In Vercel: Settings → Domains → Add Domain
3. Follow instructions to add DNS records
4. Done! Your site is at your custom domain

---

## Support & Updates

### Auto-Deploy on Code Changes
Every time you push to GitHub, Vercel automatically:
1. Builds your new code
2. Deploys it
3. Updates your live site
4. Takes ~2-3 minutes

### Monitoring
In Vercel dashboard, you can see:
- How many visitors you have
- How much bandwidth is used
- Any errors that occur

---

## 🎉 Congratulations!

Your math coaching platform is now:
- ✅ Live on the internet
- ✅ Accessible to unlimited students
- ✅ Completely free
- ✅ Auto-updating from GitHub
- ✅ Professional and scalable

**Time to start teaching!** 📚🎓

---

Need help? Check:
- Vercel Docs: vercel.com/docs
- Supabase Docs: supabase.com/docs
- Next.js Docs: nextjs.org/docs
