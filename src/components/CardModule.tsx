import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Share, Eye } from "lucide-react";
import { truncateText } from "@/lib/utils";

interface VideoCardProps {
  title: string;
  description: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
}

export default function CardModule({
  title,
  description,
  views,
  likes,
  comments,
  shares,
  publishedAt,
  thumbnail,
  url,
}: VideoCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/detail", {
      state: {
        title,
        description,
        views,
        likes,
        comments,
        shares,
        publishedAt,
        thumbnail,
        url,
      },
    });
  };

  return (
    <Card
      className="custom-transition-card flex flex-col md:flex-row justify-between items-center text-right w-full max-w-4xl min-h-[190px] mx-auto p-2 sm:p-4 hover:shadow-md cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative flex-shrink-0 w-full md:w-auto">
        <img
          src={thumbnail}
          className="w-full md:w-[180px] h-[120px] md:h-auto object-cover md:ml-[0.3rem] rounded-lg"
          alt="Video thumbnail"
          onError={(e) => {
            e.currentTarget.src = "/fallback-thumbnail.jpg";
          }}
        />
        <Badge
          variant="secondary"
          className="absolute top-[5px] right-[5px] md:right-[96px] rounded-md text-xs"
        >
          {publishedAt}
        </Badge>
      </div>

      <div className="flex-1 w-full md:pr-4" dir="rtl">
        <CardHeader className="my-1 md:my-3">
          <CardTitle>
            <h2 className="text-sm md:text-md lg:text-lg leading-tight text-foreground">
              {truncateText(title, window.innerWidth < 768 ? 50 : 70)}
            </h2>
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            {truncateText(description, window.innerWidth < 768 ? 100 : 170)}
          </CardDescription>
        </CardHeader>
        <CardContent className="hidden sm:block text-xs">
          {truncateText(description, window.innerWidth < 768 ? 60 : 100)}
        </CardContent>
        <CardFooter className="flex flex-row flex-wrap justify-center md:justify-start items-center pt-4 gap-2">
          <div className="inline-flex items-center text-red-500 mx-1">
            <Heart size={16} />
            <span className="mx-1 text-xs">{likes}</span>
          </div>
          <div className="inline-flex items-center text-blue-500 mx-1">
            <MessageSquare size={16} />
            <span className="mx-1 text-xs">{comments}</span>
          </div>
          <div className="xs:inline-flex hidden items-center text-green-500 mx-1">
            <Share size={16} />
            <span className="mx-1 text-xs">{shares}</span>
          </div>
          <div className="inline-flex items-center text-purple-500 mx-1">
            <Eye size={16} />
            <span className="mx-1 text-xs">{views}</span>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
