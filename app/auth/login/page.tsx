"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabaseClient";
import { Button } from "@/src/ui/button";
import { Input } from "@/src/ui/input";
import Link from "next/link";
import { toast } from "@/src/hooks/use-toast";

const supabase = createClient();

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // clear fields
    setEmail("");
    setPassword("");

    toast({
      title: "Login successful",
      description: "Redirecting to your dashboard...",
    });

    router.push("/");
  }

  return (
    <div className="py-10 px-4 max-h-screen">
      <div className="bg-foreColor container rounded-2xl max-w-[500px] mx-auto px-4 md:px-6 py-8 lg:px-8  h-full flex flex-col gap-4">
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Log In
          </h1>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="******"
              required
            />
          </div>

          {error && <p className="text-danger">{error}</p>}

          <Button disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-primary hover:underline font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
