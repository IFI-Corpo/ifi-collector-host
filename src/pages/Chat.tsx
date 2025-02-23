"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import {
  ImageIcon,
  FileUp,
  Figma,
  MonitorIcon,
  CircleUserRound,
  ArrowUpIcon,
  Paperclip,
  PlusIcon
} from "lucide-react";

export function Chat() {
  const [value, setValue] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        setValue("");
        adjustHeight(true);
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-4xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col items-center w-full p-4 space-y-4 sm:space-y-8">
        {/* Optional header - you can remove this if not needed */}
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground text-center">
          What can I help you ship?
        </h1>

        <div className="w-full">
          {/* Messages container - add your messages here */}
          <div className="h-[60vh] overflow-y-auto mb-4 pb-4 px-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-border">
            {/* Add your chat messages here */}
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Start a conversation...
            </div>

            {/* Gradient overlay at bottom */}
            <div className="sticky bottom-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          </div>

          {/* Input container */}
          <div className="relative bg-background rounded-xl border border-border shadow-lg">
            <div className="overflow-y-auto">
              <Textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  adjustHeight();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask v0 a question..."
                className={cn(
                  "w-full px-4 py-3",
                  "resize-none",
                  "bg-transparent",
                  "border-none",
                  "text-foreground text-sm",
                  "focus:outline-none",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                  "placeholder:text-muted-foreground placeholder:text-sm",
                  "min-h-[60px]"
                )}
                style={{
                  overflow: "hidden"
                }}
              />
            </div>

            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="group p-2 hover:bg-accent rounded-lg transition-colors flex items-center gap-1"
                >
                  <Paperclip className="w-4 h-4 text-foreground" />
                  <span className="text-xs text-muted-foreground hidden group-hover:inline transition-opacity">
                    Attach
                  </span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-2 py-1 rounded-lg text-sm text-muted-foreground transition-colors border border-dashed border-border hover:border-foreground hover:bg-accent flex items-center justify-between gap-1"
                >
                  <PlusIcon className="w-4 h-4" />
                  Project
                </button>
                <button
                  type="button"
                  className={cn(
                    "px-1.5 py-1.5 rounded-lg text-sm transition-colors border border-border hover:border-foreground hover:bg-accent flex items-center justify-between gap-1",
                    value.trim()
                      ? "bg-foreground text-background"
                      : "text-muted-foreground"
                  )}
                >
                  <ArrowUpIcon
                    className={cn(
                      "w-4 h-4",
                      value.trim() ? "text-background" : "text-muted-foreground"
                    )}
                  />
                  <span className="sr-only">Send</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 sm:overflow-x-auto sm:pb-2 sm:justify-center scrollbar-hide">
              <ActionButton
                icon={<ImageIcon className="w-4 h-4" />}
                label="Clone a Screenshot"
              />
              <ActionButton
                icon={<Figma className="w-4 h-4" />}
                label="Import from Figma"
              />
              <ActionButton
                icon={<FileUp className="w-4 h-4" />}
                label="Upload a Project"
              />
              <ActionButton
                icon={<MonitorIcon className="w-4 h-4" />}
                label="Landing Page"
              />
              <ActionButton
                icon={<CircleUserRound className="w-4 h-4" />}
                label="Sign Up Form"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 w-full sm:w-auto px-3 sm:px-4 py-2 bg-accent hover:bg-accent-hover rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap flex-shrink-0"
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}

export default Chat;
