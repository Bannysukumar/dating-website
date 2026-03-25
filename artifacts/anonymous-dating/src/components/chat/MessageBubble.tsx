import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  text: string;
  sender: "me" | "partner" | "system";
  timestamp: number;
}

export function MessageBubble({ message }: { message: Message }) {
  if (message.sender === "system") {
    return (
      <div className="flex justify-center my-4">
        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/50 backdrop-blur-sm">
          {message.text}
        </div>
      </div>
    );
  }

  const isMe = message.sender === "me";

  return (
    <div className={cn("flex w-full my-2", isMe ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-[80%] flex flex-col",
        isMe ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "px-4 py-2.5 rounded-2xl text-[15px] font-medium leading-relaxed shadow-sm",
          isMe 
            ? "bg-gradient-to-br from-primary to-accent text-white rounded-tr-sm" 
            : "bg-white/10 text-white/90 border border-white/5 rounded-tl-sm backdrop-blur-md"
        )}>
          {message.text}
        </div>
        <span className="text-[10px] text-white/30 mt-1 px-1 font-medium">
          {format(message.timestamp, "h:mm a")}
        </span>
      </div>
    </div>
  );
}
