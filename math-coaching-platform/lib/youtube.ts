const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || ''
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || ''

export interface YouTubeVideo {
  id: {
    kind: string
    videoId: string
  }
  snippet: {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
      default: { url: string; width: number; height: number }
      medium: { url: string; width: number; height: number }
      high: { url: string; width: number; height: number }
    }
    channelTitle: string
    liveBroadcastContent: string
  }
}

// Check if channel is currently live
export async function checkLiveStatus(): Promise<YouTubeVideo | null> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`
    )
    const data = await response.json()
    return data.items && data.items.length > 0 ? data.items[0] : null
  } catch (error) {
    console.error('Error checking live status:', error)
    return null
  }
}

// Get all videos from channel
export async function getChannelVideos(maxResults: number = 50): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${maxResults}&order=date&type=video&key=${YOUTUBE_API_KEY}`
    )
    const data = await response.json()
    return data.items || []
  } catch (error) {
    console.error('Error fetching videos:', error)
    return []
  }
}

// Get videos by search query (for chapter filtering)
export async function searchVideos(query: string, maxResults: number = 20): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    )
    const data = await response.json()
    return data.items || []
  } catch (error) {
    console.error('Error searching videos:', error)
    return []
  }
}

// Get video details
export async function getVideoDetails(videoId: string) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
    )
    const data = await response.json()
    return data.items && data.items.length > 0 ? data.items[0] : null
  } catch (error) {
    console.error('Error fetching video details:', error)
    return null
  }
}
