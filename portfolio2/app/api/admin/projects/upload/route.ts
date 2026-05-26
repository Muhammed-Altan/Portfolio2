import { createClient } from "@/utils/supabase/server";
import { withAdminAuth } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

function getBucketName() {
  const bucketName = process.env.SUPABASE_PROJECT_IMAGES_BUCKET?.trim();

  if (!bucketName) {
    throw new Error("SUPABASE_PROJECT_IMAGES_BUCKET is required.");
  }

  return bucketName;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const POST = withAdminAuth(async (request) => {
  try {
    const BUCKET_NAME = getBucketName();
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided." },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "File must be an image." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "File must be smaller than 10MB." },
        { status: 400 },
      );
    }

    if (!BUCKET_NAME.length) {
      return NextResponse.json(
        { success: false, message: "Bucket name is empty." },
        { status: 500 },
      );
    }

    const supabase = await createClient();
    const sanitizedName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .toLowerCase();

    if (!sanitizedName) {
      return NextResponse.json(
        { success: false, message: "Could not generate a valid file name." },
        { status: 400 },
      );
    }

    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${sanitizedName}`;
    const fileBuffer = await file.arrayBuffer();

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Supabase storage error:", error);
      return NextResponse.json(
        { success: false, message: `Upload failed: ${error.message}` },
        { status: 500 },
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

    const normalizedPublicUrl = publicUrl.trim();

    if (!normalizedPublicUrl) {
      return NextResponse.json(
        { success: false, message: "Could not generate a public URL for the uploaded file." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        url: normalizedPublicUrl,
        bucket: BUCKET_NAME,
        path: data.path,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Upload failed." },
      { status: 500 },
    );
  }
});
