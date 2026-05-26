import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  const { error } = await supabase.auth.refreshSession();

  if (error) {
    return NextResponse.json(
      { success: false, message: "Session expired." },
      { status: 401 },
    );
  }

  return NextResponse.json({ success: true, message: "Session refreshed." });
}