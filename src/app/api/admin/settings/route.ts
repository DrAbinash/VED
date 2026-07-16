import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getWorkConfig, saveWorkConfig, resetWorkConfig, defaultWork } from "@/lib/work";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Not logged in" }, { status: 401 });
  }
  const work = await getWorkConfig();
  return NextResponse.json({ ok: true, work, defaults: defaultWork });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Not logged in" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Settings must be an object" }, { status: 422 });
  }

  try {
    await saveWorkConfig(body as Record<string, unknown>);
  } catch (error) {
    console.error("[admin/settings] save failed", error);
    return NextResponse.json({ ok: false, error: "Could not save" }, { status: 500 });
  }

  // Rebuild the cached pages so the new photos appear on the next load.
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Not logged in" }, { status: 401 });
  }
  try {
    await resetWorkConfig();
  } catch (error) {
    console.error("[admin/settings] reset failed", error);
    return NextResponse.json({ ok: false, error: "Could not reset" }, { status: 500 });
  }
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
