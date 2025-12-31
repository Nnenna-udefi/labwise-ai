"use client";
import { toast } from "@/src/hooks/use-toast";
import { createClient } from "@/src/lib/supabaseClient";
import { Button } from "@/src/ui/button";
import { Input } from "@/src/ui/input";
import { MessageCircleWarning } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";

const supabase = createClient();

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [passwordAgain, setPasswordAgain] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name, // saves to user metadata on supabase
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }

    if (password !== passwordAgain) {
      setError("Passwords do not match.");
      return;
    }

    // Regex checks for password criteria
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasCapital = /[A-Z]/.test(password);

    if (!minLength || !hasNumber || !hasSpecial || !hasCapital) {
      setError("Password does not meet the required criteria.");
      return;
    }
    if (!error) {
      setName("");
      setEmail("");
      setPassword("");
      toast({
        title: "Account created!",
        description: "Check your email to confirm your account.",
      });
    }
    router.push(`/signUp/emailSent?email=${encodeURIComponent(email)}`);
  }
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="bg-foreColor container rounded-2xl max-w-125 mx-auto px-4 md:px-6 py-8 lg:px-8  h-full flex flex-col gap-4">
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Create an Account
          </h1>
          <p className="pt-3 text-foreground/70">
            Get started with your personal AI lab assistant
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
          {error && (
            <div className="flex gap-3">
              <MessageCircleWarning className="text-danger" />{" "}
              <p className="text-danger md:text-xl">{error}</p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Full Name</label>
            <Input
              value={name}
              type="text"
              placeholder="Full name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Input
              value={email}
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            {" "}
            <label htmlFor="password">Password</label>
            <Input
              value={password}
              type="password"
              placeholder="*******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Enter Password Again</label>
            <Input
              value={passwordAgain}
              type="password"
              placeholder="*******"
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
          </div>
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={8}
            value={password}
            valueAgain={passwordAgain}
            messages={{
              minLength: "Password must be at least 8 characters long.",
              specialChar: "Password must contain a special character.",
              number: "Password must contain a number.",
              capital: "Password must contain a capital letter.",
              match: "Passwords must match.",
            }}
          />

          <Button disabled={loading} className="text-lg">
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
