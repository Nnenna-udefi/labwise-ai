"use client";
import { Avatar, AvatarFallback } from "@/src/ui/avatar";
import { MailOpen } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function EmailSent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="min-h-screen py-10 px-4 flex items-center justify-center">
      <div className="bg-foreColor container rounded-2xl max-w-125 mx-auto px-6 py-10 flex flex-col gap-6 text-center">
        <Avatar className="h-12 w-12 mx-auto border">
          <AvatarFallback>
            <MailOpen className="h-6 w-6 text-primary" />
          </AvatarFallback>
        </Avatar>

        <h1 className="text-2xl font-bold">Check your email</h1>

        <p className="text-foreground/80">We sent a confirmation link to:</p>

        <p className="font-medium break-all">{email || "your email address"}</p>

        <p className="text-sm text-foreground/70">
          Click the link in your inbox to activate your account.
        </p>
      </div>
    </div>
  );
}
