"use server";

import { createClient } from "@/src/lib/supabaseServerClient";

export async function createNewSession() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("chat_sessions")
    .insert({
      user_id: user.id,
      title: "New Chat",
    })
    .select()
    .single();

  return data;
}
