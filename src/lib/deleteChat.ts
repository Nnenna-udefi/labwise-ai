"use server";
import { createClient } from "./supabaseServerClient";

export async function deleteChats() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from("chat_messages").delete().eq("user_id", user.id);

  return true;
}
