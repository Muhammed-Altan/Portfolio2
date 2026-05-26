import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    await supabase.from("_health").select("1").limit(1);
    return NextResponse.json({ status: "Connection works" });
  } catch {
    return NextResponse.json({ status: "Connection failed" }, { status: 500 });
  }
}
