import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
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
  url
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
        url
      }
    });
  };

  return (
    <Card
      className="custom-transition-card rounded-lg overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={thumbnail}
          className="w-full h-48 object-cover"
          alt="Video thumbnail"
          onError={(e) => {
            e.currentTarget.src = "/fallback-thumbnail.jpg";
          }}
        />
        <Badge variant="secondary" className="absolute top-2 left-2">
          {publishedAt}
        </Badge>
      </div>

      <div className="p-4 h-[200px]" dir="rtl">
        <CardHeader>
          <CardTitle>
            <h2 className="text-lg font-semibold">
              {truncateText(title, window.innerWidth < 768 ? 50 : 70)}
            </h2>
          </CardTitle>
          <CardDescription>
            {truncateText(description, window.innerWidth < 768 ? 100 : 170)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {truncateText(description, window.innerWidth < 768 ? 60 : 100)}
        </CardContent>
      </div>
      <CardFooter className="flex flex-wrap items-center justify-between m-4">
        <div className="inline-flex items-center text-red-500 mx-1">
          <Heart size={16} />
          <span className="mx-1 text-xs">{likes}</span>
        </div>
        <div className="inline-flex items-center text-blue-500 mx-1">
          <MessageSquare size={16} />
          <span className="mx-1 text-xs">{comments}</span>
        </div>
        <div className="hidden xs:inline-flex items-center text-green-500 mx-1">
          <Share size={16} />
          <span className="mx-1 text-xs">{shares}</span>
        </div>
        <div className="inline-flex items-center text-purple-500 mx-1">
          <Eye size={16} />
          <span className="mx-1 text-xs">{views}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
