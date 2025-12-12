"use server";

import { createClient } from "./supabaseServerClient";

export async function getChatHistory() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at");

  return data ?? [];
}
