import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export interface AdminUser {
  id: string;
  email: string;
  role: "admin";
}

export async function getAuthenticatedAdminFromCookies(): Promise<AdminUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) return null;

  return { id: user.id, email: user.email, role: "admin" };
}

export function withAdminAuth(
  handler: (request: NextRequest, user: AdminUser) => Promise<Response> | Response,
) {
  return async (request: NextRequest) => {
    const user = await getAuthenticatedAdminFromCookies();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    return handler(request, user);
  };
}