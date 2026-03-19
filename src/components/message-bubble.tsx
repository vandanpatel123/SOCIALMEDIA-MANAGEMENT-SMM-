import type { InboxMessage } from "@/lib/types";

export function MessageBubble({ message }: { message: InboxMessage }) {
  const isAgent = message.sender === "agent";

  return (
    <div className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-[24px] px-4 py-3 text-sm leading-6 shadow-sm ${
          isAgent
            ? "bg-primary-600 text-white"
            : "border border-slate-200 bg-white text-slate-700"
        }`}
      >
        <p>{message.text}</p>
        <p className={`mt-2 text-xs ${isAgent ? "text-primary-100" : "text-slate-400"}`}>
          {message.time}
        </p>
      </div>
    </div>
  );
}
