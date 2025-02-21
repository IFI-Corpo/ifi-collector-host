"use client";
import { useState } from "react";
import SearchInput from "@/components/searchinput";
import CardModule from "@/components/CardModule";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { VideoItem } from "@/lib/youtube-api";

export default function Search() {
  const [results, setResults] = useState<VideoItem[]>([]);

  return (
    <div className="SearchCon flex flex-col justify-center items-center text-center space-y-9">
      <ScrollProgress className="top-0" />
      <div className="mt-10">
        <SearchInput onSearch={setResults} />
      </div>

      <div className="container flex flex-col justify-center items-center space-y-4">
        {results.length > 0 ? (
          results.map((video) => (
            <CardModule
              key={video.url}
              title={video.title}
              description={video.description}
              views={video.views}
              likes={video.likes}
              comments={video.comments}
              shares="N/A"
              publishedAt={video.publishedAt}
              thumbnail={video.thumbnail}
              url={video.url}
            />
          ))
        ) : (
          <p className="text-muted-foreground">
            !هنوز هیچ نتیجه ای وجود ندارد. شروع به جستجو کنید
          </p>
        )}
      </div>
    </div>
  );
}
