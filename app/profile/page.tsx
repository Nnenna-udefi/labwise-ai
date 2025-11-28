import { createClient } from "@/src/lib/supabaseServerClient";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createClient(); // ✅ await because createServer is async

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
    </div>
  );
}
