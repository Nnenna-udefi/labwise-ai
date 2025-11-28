"use client";
import { toast } from "@/src/hooks/use-toast";
import { createClient } from "@/src/lib/supabaseClient";
import { Button } from "@/src/ui/button";
import { Input } from "@/src/ui/input";
import Link from "next/link";
import React, { useState } from "react";

const supabase = createClient();

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        emailRedirectTo: `${window.location.origin}/auth/login`,
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
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
  }
  return (
    <div className="max-h-screen py-10 px-4">
      <div className="bg-foreColor container rounded-2xl max-w-[500px] mx-auto px-4 md:px-6 py-8 lg:px-8  h-full flex flex-col gap-4">
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Create an Account
          </h1>
          <p className="pt-3 text-foreground/70">
            Get started with your personal AI lab assistant
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
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
              placeholder=". . . . . . ."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <Button disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/login"
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
