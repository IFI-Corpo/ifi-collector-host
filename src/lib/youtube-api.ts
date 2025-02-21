const YOUTUBE_API_KEY = "AIzaSyDPE1bdcOlvjYstp0yAAjXekAVgMsv9NrI";
const GEMINI_API_KEY = "AIzaSyDMm6SM7x9zKkxV_5WdpwG-wJRusN7xm0E";

type Filters = {
  sortBy?: string;
  uploadDate?: string;
  platforms?: string[];
  duration?: string;
};

export interface VideoItem {
  title: string;
  description: string;
  summary: string;
  views: string;
  likes: string;
  comments: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
}

// Utility Functions
export const formatNumber = (number?: string | number): string => {
  if (!number) return "N/A";
  const num = typeof number === "string" ? parseInt(number) : number;
  if (isNaN(num)) return "N/A";

  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

const getISODate = (filter: string): string => {
  const now = new Date();
  switch (filter) {
    case "last hour":
      now.setHours(now.getHours() - 1);
      break;
    case "today":
      now.setHours(0, 0, 0, 0);
      break;
    case "this week":
      now.setDate(now.getDate() - 7);
      break;
    case "this month":
      now.setMonth(now.getMonth() - 1);
      break;
    case "this year":
      now.setFullYear(now.getFullYear() - 1);
      break;
    default:
      return "";
  }
  return now.toISOString();
};

const parseISODuration = (duration: string): number => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
};

export const getVideoSummary = async (videoUrl: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Provide a concise summary of this YouTube video: ${videoUrl}`,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();
    console.log("Gemini API response:", data);

    // Handle the new response format
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available."
    );
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Error generating summary.";
  }
};

export const youtubeSearch = async (
  query: string,
  maxResults = 10,
  filters: Filters = {},
): Promise<VideoItem[]> => {
  try {
    const params = new URLSearchParams({
      part: "snippet",
      type: "video",
      maxResults: maxResults.toString(),
      q: query,
      key: YOUTUBE_API_KEY,
    });

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "view count":
          params.set("order", "viewCount");
          break;
        case "upload date":
          params.set("order", "date");
          break;
        case "rating":
          params.set("order", "rating");
          break;
        default:
          params.set("order", "relevance");
      }
    }

    if (filters.uploadDate) {
      params.set("publishedAfter", getISODate(filters.uploadDate));
    }

    if (filters.platforms && !filters.platforms.includes("YouTube")) {
      return [];
    }

    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${params}`,
    );
    const searchData = await searchRes.json();
    if (!searchData.items?.length) return [];

    const videoIds = searchData.items.map((item: any) => item.id.videoId);

    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=${videoIds.join(
        ",",
      )}&key=${YOUTUBE_API_KEY}`,
    );
    const statsData = await statsRes.json();

    const videoDataMap = new Map<string, any>();
    statsData.items.forEach((video: any) => {
      videoDataMap.set(video.id, video);
    });

    const results: VideoItem[] = searchData.items.map((item: any) => {
      const videoData = videoDataMap.get(item.id.videoId);
      if (!videoData) return null;

      const durationSeconds = parseISODuration(
        videoData.contentDetails.duration,
      );
      if (filters.duration) {
        if (filters.duration === "short" && durationSeconds > 60) return null;
        if (filters.duration === "long" && durationSeconds < 60) return null;
      }

      const stats = videoData.statistics || {};
      const videoUrl = `https://www.youtube.com/watch?v=${videoData.id}`;

      return {
        title: videoData.snippet.title,
        description: videoData.snippet.description,
        summary: "", // Empty summary initially
        url: videoUrl,
        views: formatNumber(stats.viewCount),
        likes: formatNumber(stats.likeCount),
        comments: formatNumber(stats.commentCount),
        publishedAt: formatDate(new Date(videoData.snippet.publishedAt)),
        thumbnail:
          videoData.snippet.thumbnails?.medium?.url ||
          "/fallback-thumbnail.jpg",
      };
    });

    return results.filter((item) => item !== null) as VideoItem[];
  } catch (error) {
    console.error("YouTube API error:", error);
    return [];
  }
};
