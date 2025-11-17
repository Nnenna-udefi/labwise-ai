import ChatComponent from "@/src/component/chatComponent";
import React from "react";

const ChatbotPage = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 h-full flex flex-col">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
          Labwise AI Chatbot
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          Ask me anything about your medical lab tests. I&apos;m here to provide
          clear and simple explanations.
        </p>
        <div className="flex-1 flex flex-col pb-4">
          <ChatComponent />
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
