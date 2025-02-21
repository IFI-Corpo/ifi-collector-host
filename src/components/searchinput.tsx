"use client";

import * as React from "react";
import { useEffect, useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LoaderCircle,
  Search,
  SlidersHorizontal,
  Eye,
  MessageSquare,
  Heart,
  Instagram,
  Twitter,
  Film,
  Youtube,
  Clock,
  MapPin,
  Box,
  Lock
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { youtubeSearch } from "@/lib/youtube-api";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQueryList.addEventListener("change", listener);
    setMatches(mediaQueryList.matches);
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);
  return matches;
}

function parseFormattedNumber(formatted: string): number {
  if (formatted === "N/A") return 0;
  if (formatted.endsWith("M")) {
    return parseFloat(formatted) * 1_000_000;
  }
  if (formatted.endsWith("K")) {
    return parseFloat(formatted) * 1_000;
  }
  return parseInt(formatted.replace(/,/g, ""), 10);
}

const WORKING_FILTERS = ["uploadDate", "sortBy"];

const FILTER_OPTIONS = {
  platforms: {
    type: "multiple" as const,
    options: ["تردز", "اینستاگرام", "X (توییتر)", "تیک تاک", "یوتوب"] as const
  },
  uploadDate: {
    type: "single" as const,
    options: ["یک ساعت گذشته", "امروز", "این هفته", "این ماه", "امسال"] as const
  },
  type: {
    type: "multiple" as const,
    options: ["ویدیو", "کانال"] as const
  },
  // Change the duration filter to a single select with two options:
  duration: {
    type: "single" as const,
    options: ["کوتاه", "بلند"] as const
  },
  features: {
    type: "multiple" as const,
    options: [
      "زنده",
      "۴K",
      "HD",
      "زیرنویس/متن",
      "کپی‌رایت آزاد",
      "۳۶۰ درجه",
      "VR180",
      "۳D",
      "HDR",
      "مکان",
      "خریداری شده"
    ] as const
  },
  sortBy: {
    type: "single" as const,
    options: ["تعداد بازدید", "تعداد نظرات", "تعداد لایک‌ها"]
  }
};

const FILTER_LABELS: Record<string, string> = {
  platforms: "پلتفرم‌ها",
  uploadDate: "تاریخ آپلود",
  type: "نوع",
  duration: "مدت زمان",
  features: "ویژگی‌ها",
  sortBy: "مرتب‌سازی بر اساس"
};

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  تردز: MessageSquare,
  اینستاگرام: Instagram,
  "X (توییتر)": Twitter,
  "تیک تاک": Film,
  یوتوب: Youtube
};

const PLATFORM_COLORS: Record<string, string> = {
  تردز: "#1DA1F2",
  اینستاگرام: "#E1306C",
  "X (توییتر)": "#1DA1F2",
  "تیک تاک": "#69C9D0",
  یوتوب: "#FF0000"
};

const SORT_ICONS: Record<string, React.ElementType> = {
  "تعداد بازدید": Eye,
  "تعداد نظرات": MessageSquare,
  "تعداد لایک‌ها": Heart
};

const FEATURE_ICONS: Record<string, React.ElementType> = {
  زنده: Clock,
  "۴K": Box,
  HD: Box,
  "زیرنویس/متن": MessageSquare,
  "کپی‌رایت آزاد": Lock,
  "۳۶۰ درجه": MapPin,
  VR180: Eye,
  "۳D": Box,
  HDR: Eye,
  مکان: MapPin,
  "خریداری شده": Box
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  ویدیو: Film,
  کانال: Box,
  "لیست پخش": Film,
  فیلم: Film
};

const CustomToggleGroup = ToggleGroup as React.FC<{
  type: "single" | "multiple";
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  variant: "outline";
  className: string;
  children: React.ReactNode;
}>;

function FilterMenu({
  onApplyFilters
}: {
  onApplyFilters: (filters: any) => void;
}) {
  const [uploadDate, setUploadDate] = useState<string>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "یوتوب"
  ]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("");

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const applyFilters = () => {
    const newFilters = {
      platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
      uploadDate: uploadDate || undefined,
      type: selectedType.length > 0 ? selectedType : undefined,
      duration: selectedDuration.length > 0 ? selectedDuration : undefined,
      features: selectedFeatures.length > 0 ? selectedFeatures : undefined,
      sortBy: sortBy || undefined
    };
    const cleanedFilters = {
      ...Object.fromEntries(
        Object.entries(newFilters).filter(([_, v]) => v !== undefined)
      ),
      appliedAt: new Date().toISOString()
    };
    console.log("Applying Filters:", cleanedFilters);
    onApplyFilters(cleanedFilters);
  };

  const renderFilterGroup = (
    key: string,
    label: string,
    items: readonly string[],
    value: string | string[],
    onChange: (value: string | string[]) => void,
    type: "single" | "multiple"
  ) => {
    const isWorking = WORKING_FILTERS.includes(key);
    const isYoutubeSelected = selectedPlatforms.includes("یوتوب");

    if (key === "uploadDate") {
      items = items.filter(
        (item) => item !== "یک ساعت گذشته" || !isYoutubeSelected
      );
    }

    return (
      <div className="space-y-2 px-4 flex flex-col justify-center items-start text-right">
        <h4
          className={`text-sm font-medium ${
            isWorking ? "" : "text-foreground"
          }`}
        >
          {label}
        </h4>
        <CustomToggleGroup
          type={type}
          value={value}
          onValueChange={onChange}
          variant="outline"
          className="flex flex-wrap justify-end items-start text-right gap-1"
        >
          {(items as string[]).map((item) => {
            let IconComponent: React.ElementType | null = null;
            let iconColor = "currentColor";

            if (key === "platforms") {
              IconComponent = PLATFORM_ICONS[item] || null;
              iconColor = PLATFORM_COLORS[item] || "currentColor";
            } else if (key === "sortBy") {
              IconComponent = SORT_ICONS[item] || null;
            } else if (key === "features") {
              IconComponent = FEATURE_ICONS[item] || null;
            } else if (key === "type") {
              IconComponent = TYPE_ICONS[item] || null;
            }
            const isDisabled =
              key === "uploadDate" &&
              item === "یک ساعت گذشته" &&
              isYoutubeSelected;
            return (
              <ToggleGroupItem
                key={item}
                value={item.toLowerCase().replace(/\s+/g, "-")}
                aria-label={`انتخاب ${item}`}
                className={`h-8 px-2 text-xs data-[state=on]:bg-primary data-[state=on]:text-primary-foreground flex items-center gap-1 ${
                  key === "platforms" ? `bg-[${PLATFORM_COLORS[item]}]` : ""
                } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isDisabled}
              >
                {IconComponent && (
                  <IconComponent
                    size={16}
                    color={iconColor}
                    className="inline-block"
                  />
                )}
                {item}
              </ToggleGroupItem>
            );
          })}
        </CustomToggleGroup>
      </div>
    );
  };

  const FilterContent = () => (
    <div dir="rtl" className="grid gap-4 max-h-[80vh] overflow-y-auto">
      {Object.entries(FILTER_OPTIONS).map(([key, config]) => (
        <React.Fragment key={key}>
          {renderFilterGroup(
            key,
            FILTER_LABELS[key] || key,
            config.options,
            key === "uploadDate"
              ? uploadDate
              : key === "sortBy"
              ? sortBy
              : key === "platforms"
              ? selectedPlatforms
              : key === "type"
              ? selectedType
              : key === "duration"
              ? selectedDuration
              : key === "features"
              ? selectedFeatures
              : [],
            key === "uploadDate"
              ? (value) => setUploadDate(value as string)
              : key === "sortBy"
              ? (value) => setSortBy(value as string)
              : key === "platforms"
              ? (value) => setSelectedPlatforms(value as string[])
              : key === "type"
              ? (value) => setSelectedType(value as string[])
              : key === "duration"
              ? (value) => setSelectedDuration(value as string[])
              : key === "features"
              ? (value) => setSelectedFeatures(value as string[])
              : () => {},
            config.type
          )}
        </React.Fragment>
      ))}
      <div className="StickyBtn sticky bottom-0 bg-background p-4">
        <Button className="w-full" onClick={applyFilters}>
          اعمال فیلترها
        </Button>
      </div>
    </div>
  );

  return isDesktop ? (
    <Popover>
      <PopoverTrigger asChild>
        <button className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center">
          <SlidersHorizontal size={16} strokeWidth={2} />
        </button>
      </PopoverTrigger>
      <PopoverContent dir="rtl" className="w-[80vw] max-w-3xl" align="end">
        <FilterContent />
      </PopoverContent>
    </Popover>
  ) : (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center">
          <SlidersHorizontal size={16} strokeWidth={2} />
        </button>
      </DrawerTrigger>
      <DrawerContent dir="rtl" className="max-h-[90vh]">
        <FilterContent />
      </DrawerContent>
    </Drawer>
  );
}

export default function SearchInput({
  onSearch
}: {
  onSearch: (results: any[]) => void;
}) {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [filters, setFilters] = useState<any>({});

  const performSearch = async () => {
    if (inputValue.trim()) {
      setIsLoading(true);
      try {
        const results = await youtubeSearch(inputValue, 10, filters);
        if (filters.sortBy) {
          const normalizedSort = filters.sortBy.replace(/-/g, " ");
          if (normalizedSort === "تعداد بازدید") {
            results.sort(
              (a, b) =>
                parseFormattedNumber(b.views) - parseFormattedNumber(a.views)
            );
          } else if (normalizedSort === "تعداد لایک‌ها") {
            results.sort(
              (a, b) =>
                parseFormattedNumber(b.likes) - parseFormattedNumber(a.likes)
            );
          } else if (normalizedSort === "تعداد نظرات") {
            results.sort(
              (a, b) =>
                parseFormattedNumber(b.comments) -
                parseFormattedNumber(a.comments)
            );
          }
        }
        onSearch(results);
      } catch (error) {
        console.error("Search failed:", error);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(performSearch, 500);
    return () => clearTimeout(delaySearch);
  }, [inputValue, filters]);

  return (
    <div
      className={`space-y-2 relative ${isFocused ? "backdrop-blur-sm" : ""}`}
      dir="rtl"
    >
      <Label
        htmlFor={id}
        className={`custom-transition-label ${
          isFocused
            ? "opacity-0 translate-y-[-12px]"
            : "opacity-100 translate-y-0"
        }`}
      >
        جستجوی پیشرفته
      </Label>
      <div
        className={`InputSearch relative w-[30vh] xs:w-[50vh] sm:w-[65vh] lg:w-[90vh] custom-transition-input ${
          isFocused
            ? "scale-105 translate-y-[-10px]"
            : "scale-100 translate-y-0"
        }`}
      >
        <Input
          id={id}
          className="peer pe-9 ps-9"
          placeholder="جستجو کنید..."
          type="search"
          value={inputValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
          }}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircle
              className="animate-spin"
              size={16}
              strokeWidth={1.5}
              role="status"
              aria-label="Loading..."
            />
          ) : (
            <Search size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </div>
        <FilterMenu
          onApplyFilters={(newFilters) => {
            setFilters({ ...newFilters, appliedAt: new Date().toISOString() });
          }}
        />
      </div>
    </div>
  );
}
