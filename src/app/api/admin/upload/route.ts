import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getUploadsDir } from "@/lib/uploads";

export const dynamic = "force-dynamic";

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

// Matches the "up to 10 MB" hint shown in the admin panel.
const MAX_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Not logged in" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid upload" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file received" }, { status: 400 });
  }

  const ext = EXT_BY_TYPE[file.type];
  if (!ext) {
    return NextResponse.json(
      { ok: false, error: "Please choose a JPG, PNG, WebP, or GIF photo." },
      { status: 415 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: "That photo is larger than 10 MB. Please choose a smaller one." },
      { status: 413 }
    );
  }

  try {
    const dir = getUploadsDir();
    await mkdir(dir, { recursive: true });
    const name = `${Date.now()}-${randomBytes(4).toString("hex")}${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, name), bytes);
    return NextResponse.json({ ok: true, url: `/api/uploads/${name}` });
  } catch (error) {
    console.error("[admin/upload] save failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not save the photo. Please try again." },
      { status: 500 }
    );
  }
}
