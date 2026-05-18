export type EmbedPlatform = 'youtube' | 'x' | 'instagram' | 'unknown'

export interface EmbedInfo {
  platform: EmbedPlatform
  embedUrl: string
  thumbnailUrl?: string
  id: string
}

export function parseEmbedUrl(url: string): EmbedInfo | null {
  const trimmed = url.trim()

  // YouTube
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) {
    return {
      platform: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`,
      id: ytMatch[1],
    }
  }

  // X (Twitter)
  const xMatch = trimmed.match(/x\.com\/\w+\/status\/(\d+)/)
  if (xMatch) {
    return {
      platform: 'x',
      embedUrl: `https://platform.x.com/embed/Tweet.html?id=${xMatch[1]}`,
      id: xMatch[1],
    }
  }

  // Instagram
  const igMatch = trimmed.match(/instagram\.com\/(?:p|reel|reels)\/([a-zA-Z0-9_-]+)/)
  if (igMatch) {
    return {
      platform: 'instagram',
      embedUrl: `https://www.instagram.com/p/${igMatch[1]}/embed/`,
      id: igMatch[1],
    }
  }

  return null
}
