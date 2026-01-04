"use client";
import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { ScrollArea } from "../ui/scrollArea";
import { Bot, Loader2, Paperclip, Send, User } from "lucide-react";
import { cn } from "../lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getAiAnswer } from "../lib/actions";
import { getChatHistory } from "../lib/getChatHistory";
import { saveMessage } from "../lib/saveMessage";
// import { deleteChats } from "../lib/deleteChat";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");

  useEffect(() => {
    async function loadHistory() {
      const history = await getChatHistory();
      setMessages(
        history.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))
      );
    }
    loadHistory();
  }, []);

  // Every time the messages array changes i.e when a new chat message is added,
  //  the effect runs, it scrolls the chat container to the bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "text/plain") {
      const text = await file.text();
      setExtractedText(text);
    } else {
      setExtractedText(
        "Unsupported file type. Please upload a .txt or .pdf or .doc document."
      );
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    saveMessage("user", input); // save user message
    setInput("");

    // useTransition() is used when you want to update state without blocking the UI
    // for instance, in this case "getAiAnswer(input)" might take 1-3 secs.
    // If the state was updated synchronously during that long wait, react would freeze the interface.
    // But wrapping the slow update inside startTransition tells React that that part is "low priority state update" so don't freeze the UI while it runs.
    // Let the app stay responsive.
    startTransition(async () => {
      const combinedInput = extractedText
        ? ` The following is content from a medical document: ${extractedText}
User question: ${input} `
        : input;

      const aiResponse = await getAiAnswer(combinedInput);
      const assistantMessage: Message = {
        role: "assistant",
        content: aiResponse,
      };
      setMessages((prev) => [...prev, assistantMessage]);

      await saveMessage("assistant", aiResponse); // save assistant message
    });
  };
  console.log(extractedText);
  return (
    <div className="flex flex-col my-6 min-h-screen bg-foreColor border rounded-lg shadow-lg">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="text-center text-foreground/80 p-8">
              <Bot className="mx-auto h-12 w-12 mb-4" />
              <p>Start the conversation by asking a question below.</p>
              <p className="text-sm mt-2">
                For example: &quot;What is a CBC test?&quot;
              </p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-4",
                message.role === "user" ? "justify-end" : ""
              )}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback>
                    <Bot className="h-5 w-5 text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-md rounded-lg p-3 text-left text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                )}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback>
                    <User className="h-5 w-5 text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isPending && (
            <div className="flex items-start gap-4">
              <Avatar className="h-8 w-8 border">
                <AvatarFallback>
                  <Bot className="h-5 w-5 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-md rounded-lg p-3 bg-secondary flex items-center space-x-2">
                <span className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-primary rounded-full animate-pulse"></span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {/* <Button
            variant="outline"
            type="button"
            onClick={async () => {
              await deleteChats();
              setMessages([]);
            }}
            className="bg-danger hover:bg-white hover:text-danger text-white"
          >
            {/* <Trash2 className=" w-5 h-5 font-bold" /> */}
          {/* Clear Chat */}
          {/* </Button> */}

          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept=".pdf,.txt,.doc,.docx,.jpg,.png,.jpeg"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              console.log("Selected file:", file.name);
            }}
          />

          {extractedText ? (
            <p className="text-xs text-muted-foreground mt-1">
              📎 Document attached
            </p>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              // className="shrink-0"
            >
              <Paperclip className="h-5 w-5" />
              <span className="sr-only">Attach file</span>
            </Button>
          )}

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here ..."
            className="flex-1"
            disabled={isPending}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isPending || !input.trim()}
            className="shrink-0"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;
