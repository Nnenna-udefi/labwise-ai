"use server";

import { createClient } from "@/src/lib/supabaseServerClient";

export async function getMessagesBySession(sessionId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("chat_messages")
    .select("role, content")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  return data || [];
}
