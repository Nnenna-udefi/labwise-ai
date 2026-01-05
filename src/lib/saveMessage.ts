"use server";

import { createClient } from "./supabaseServerClient";

export async function saveMessage(
  // sessionId: string,
  role: "user" | "assistant",
  content: string
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from("chat_messages").insert({
    user_id: user.id,
    // session_id: sessionId,
    role,
    content,
  });
}
