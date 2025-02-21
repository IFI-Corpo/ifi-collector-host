import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Share, Eye } from "lucide-react";
import { getVideoSummary } from "@/lib/youtube-api";
import { ArrowUpLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { motion } from "framer-motion";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { ShineBorder } from "@/components/magicui/shine-border";
import { BorderBeam } from "@/components/magicui/border-beam";

interface CardDetailProps {
  title: string;
  description: string;
  summary?: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
}

export default function CardDetail() {
  const location = useLocation();
  const {
    title,
    description,
    summary: initialSummary,
    views,
    likes,
    comments,
    shares,
    publishedAt,
    thumbnail,
    url
  } = location.state as CardDetailProps;

  const [summary, setSummary] = useState<string>(
    initialSummary || "Loading summary..."
  );

  const isPersian = (text: string): boolean => {
    const persianRegex = /[\u0600-\u06FF]/;
    return persianRegex.test(text);
  };

  useEffect(() => {
    const fetchSummary = async () => {
      const fetchedSummary = await getVideoSummary(url);
      setSummary(fetchedSummary);
    };
    fetchSummary();
  }, [url]);

  return (
    <div className="flex flex-col justify-center items-center text-center p-4">
      <ScrollProgress className="top-0" />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mx-12 relative"
      >
        <Card className="w-full max-w-4xl border p-4">
          <img
            src={thumbnail}
            alt="Video Thumbnail"
            className="w-full h-64 object-cover rounded-md mb-2"
            onError={(e) => {
              e.currentTarget.src = "/fallback-thumbnail.jpg";
            }}
          />
          <CardHeader>
            <CardTitle className="flex flex-row justify-center items-center text-center text-3xl mt-5 font-bold">
              <h1>{title}</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="my-4">
              <ShineBorder
                className="p-[0px]"
                color={["#27272a", "#71717a", "#fafafa"]}
              >
                <div
                  className="flex rounded-md bg-background p-4"
                  dir={isPersian(description) ? "rtl" : "ltr"}
                >
                  <p
                    className={`text-xs md:text-base text-foreground ${
                      isPersian(description) ? "text-right" : "text-left"
                    }`}
                  >
                    {description}
                  </p>
                </div>
              </ShineBorder>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-purple-500">
                <Eye size={20} />
                <span className="text-sm">{views}</span>
              </div>
              <div className="flex items-center gap-1 text-red-500">
                <Heart size={20} />
                <span className="text-sm">{likes}</span>
              </div>
              <div className="flex items-center gap-1 text-blue-500">
                <MessageSquare size={20} />
                <span className="text-sm">{comments}</span>
              </div>
              <div className="flex items-center gap-1 text-green-500">
                <Share size={20} />
                <span className="text-sm">{shares}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center text-center space-y-2 mb-4">
              <Badge variant="secondary" className="mx-auto">
                {publishedAt}
              </Badge>

              <div
                className={cn(
                  "group rounded-lg border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <ArrowUpLeft className="mr-3 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    لینک مشاهده در یوتیوب
                  </a>
                </AnimatedShinyText>
              </div>
            </div>
            <div className="">
              <ShineBorder
                className="p-[0px]"
                color={["#27272a", "#71717a", "#fafafa"]}
              >
                <div className="bg-background p-4">
                  <p className="mb-2 font-medium">Gemini Video Summary:</p>
                  <p className="text-sm md:text-base">{summary}</p>
                </div>
              </ShineBorder>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
