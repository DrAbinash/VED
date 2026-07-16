"use client";

import * as React from "react";
import {
  Loader2,
  Save,
  LogOut,
  RotateCcw,
  ExternalLink,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Camera,
  ChefHat,
  Upload,
  Trash2,
  ChevronUp,
  ChevronDown,
  LayoutGrid,
  Rows3,
} from "lucide-react";

import type { WorkConfig, WorkCollection } from "@/lib/work";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type AuthState = "checking" | "login" | "ready";

export default function AdminPage() {
  const [authState, setAuthState] = React.useState<AuthState>("checking");
  const [usingDefaultPassword, setUsingDefaultPassword] = React.useState(false);
  const [work, setWork] = React.useState<WorkConfig | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [saveMessage, setSaveMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const loadWork = React.useCallback(async () => {
    const res = await fetch("/api/admin/settings");
    if (!res.ok) {
      setAuthState("login");
      return;
    }
    const data = (await res.json()) as { ok: boolean; work: WorkConfig };
    setWork(data.work);
    setAuthState("ready");
  }, []);

  React.useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/admin/login");
        const data = (await res.json()) as {
          authenticated: boolean;
          usingDefaultPassword: boolean;
        };
        setUsingDefaultPassword(data.usingDefaultPassword);
        if (data.authenticated) {
          await loadWork();
        } else {
          setAuthState("login");
        }
      } catch {
        setAuthState("login");
      }
    })();
  }, [loadWork]);

  function mutate(edit: (draft: WorkConfig) => void) {
    setWork((prev) => {
      if (!prev) return prev;
      const draft = structuredClone(prev);
      edit(draft);
      return draft;
    });
    setSaveMessage(null);
  }

  async function handleSave() {
    if (!work || saving) return;
    setSaving(true);
    setErrorMessage(null);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(work),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || "Could not save. Please try again.");
        return;
      }
      setSaveMessage("Saved! Open the pages to see your new photos.");
    } catch {
      setErrorMessage("Could not save. Please check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    if (
      !window.confirm(
        "This removes ALL your edits and returns both pages to the starter photos. Uploaded photos stay saved but will no longer be shown. Continue?"
      )
    ) {
      return;
    }
    setErrorMessage(null);
    const res = await fetch("/api/admin/settings", { method: "DELETE" });
    if (res.ok) {
      await loadWork();
      setSaveMessage("Pages returned to the original photos.");
    } else {
      setErrorMessage("Could not reset. Please try again.");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setWork(null);
    setAuthState("login");
  }

  if (authState === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (authState === "login") {
    return <LoginScreen onSuccess={loadWork} usingDefaultPassword={usingDefaultPassword} />;
  }

  if (!work) return null;

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <h1 className="text-lg font-bold">My Work — Photo Manager</h1>
            <p className="text-xs text-muted-foreground">
              Upload and arrange the photos on your Photography and Foods pages
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a href="/photography" target="_blank" rel="noreferrer">
                <ExternalLink className="mr-1.5 size-4" />
                View pages
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-1.5 size-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        {usingDefaultPassword && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <p>
              You are using the default password. Set your own with an{" "}
              <code className="rounded bg-amber-500/15 px-1">ADMIN_PASSWORD</code> value in{" "}
              <code className="rounded bg-amber-500/15 px-1">docker-compose.yml</code>.
            </p>
          </div>
        )}

        <Tabs defaultValue="photography">
          <TabsList className="mb-4">
            <TabsTrigger value="photography" className="gap-1.5">
              <Camera className="size-4" />
              Photography
            </TabsTrigger>
            <TabsTrigger value="foods" className="gap-1.5">
              <ChefHat className="size-4" />
              Foods
            </TabsTrigger>
          </TabsList>

          {(["photography", "foods"] as const).map((key) => (
            <TabsContent key={key} value={key}>
              <CollectionEditor
                collection={work[key]}
                onChange={(edit) => mutate((d) => edit(d[key]))}
                onError={setErrorMessage}
              />
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold">Start over</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 border-red-500/40 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            onClick={handleReset}
          >
            <RotateCcw className="mr-2 size-4" />
            Reset both pages to the original photos
          </Button>
        </div>
      </main>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0 text-sm">
            {saveMessage && (
              <p className="flex items-center gap-1.5 text-primary">
                <CheckCircle2 className="size-4 shrink-0" />
                <span className="truncate">{saveMessage}</span>
              </p>
            )}
            {errorMessage && (
              <p className="flex items-center gap-1.5 text-red-400">
                <AlertTriangle className="size-4 shrink-0" />
                <span className="truncate">{errorMessage}</span>
              </p>
            )}
          </div>
          <Button onClick={handleSave} disabled={saving} className="shrink-0">
            {saving ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Save className="mr-2 size-4" />
            )}
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Collection editor ─────────────────────── */

function CollectionEditor({
  collection,
  onChange,
  onError,
}: {
  collection: WorkCollection;
  onChange: (edit: (c: WorkCollection) => void) => void;
  onError: (msg: string | null) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState("");

  /** Upload every selected file, appending each to the collection. */
  async function handleFiles(files: FileList) {
    setUploading(true);
    onError(null);
    let done = 0;
    let failed = 0;
    for (const file of Array.from(files)) {
      setProgress(`Uploading ${done + failed + 1} of ${files.length}…`);
      try {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: form });
        const data = (await res.json()) as { ok: boolean; url?: string; error?: string };
        if (res.ok && data.ok && data.url) {
          const url = data.url;
          onChange((c) => c.photos.push({ src: url, caption: "" }));
          done++;
        } else {
          failed++;
          onError(data.error || "Some photos could not be uploaded.");
        }
      } catch {
        failed++;
        onError("Some photos could not be uploaded. Please check your connection.");
      }
    }
    setUploading(false);
    setProgress("");
    if (done > 0 && failed === 0) onError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-5">
      {/* Page text */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="mb-3 text-sm font-semibold">Page heading</p>
        <div className="grid gap-3">
          <div className="space-y-1.5">
            <Label htmlFor={`${collection.title}-title`}>Title</Label>
            <Input
              id={`${collection.title}-title`}
              value={collection.title}
              onChange={(e) => onChange((c) => (c.title = e.target.value))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`${collection.title}-subtitle`}>One-line intro</Label>
            <Textarea
              id={`${collection.title}-subtitle`}
              rows={2}
              value={collection.subtitle}
              onChange={(e) => onChange((c) => (c.subtitle = e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Layout picker */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-semibold">Photo layout</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Both options fill the page completely — no blank gaps.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => onChange((c) => (c.layout = "masonry"))}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
              collection.layout === "masonry"
                ? "border-primary/60 bg-primary/15 text-primary"
                : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/25"
            )}
          >
            <Rows3 className="size-4" />
            Auto (flowing mosaic)
          </button>
          <button
            type="button"
            onClick={() => onChange((c) => (c.layout = "grid"))}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
              collection.layout === "grid"
                ? "border-primary/60 bg-primary/15 text-primary"
                : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/25"
            )}
          >
            <LayoutGrid className="size-4" />
            Square grid
          </button>
        </div>
      </div>

      {/* Upload */}
      <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-6 text-center">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) void handleFiles(e.target.files);
          }}
        />
        <Button
          type="button"
          size="lg"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-full px-6"
        >
          {uploading ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Upload className="mr-2 size-4" />
          )}
          {uploading ? progress || "Uploading…" : "Add photos"}
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">
          Pick one or many at once — JPG, PNG, WebP, or GIF, up to 10 MB each.
          Don&apos;t forget to press <strong>Save changes</strong> after uploading.
        </p>
      </div>

      {/* Photo list */}
      {collection.photos.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/15 p-6 text-center text-sm text-muted-foreground">
          No photos yet — add some above. The page shows a friendly
          &quot;coming soon&quot; note until then.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {collection.photos.map((photo, i) => (
            <li
              key={`${photo.src}-${i}`}
              className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
            >
              <img
                src={photo.src}
                alt={photo.caption || `Photo ${i + 1}`}
                className="size-20 shrink-0 rounded-lg object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <Input
                  value={photo.caption}
                  placeholder="Caption (optional)"
                  onChange={(e) =>
                    onChange((c) => (c.photos[i].caption = e.target.value))
                  }
                />
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    disabled={i === 0}
                    onClick={() =>
                      onChange((c) => {
                        const [item] = c.photos.splice(i, 1);
                        c.photos.splice(i - 1, 0, item);
                      })
                    }
                    title="Move earlier"
                  >
                    <ChevronUp className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    disabled={i === collection.photos.length - 1}
                    onClick={() =>
                      onChange((c) => {
                        const [item] = c.photos.splice(i, 1);
                        c.photos.splice(i + 1, 0, item);
                      })
                    }
                    title="Move later"
                  >
                    <ChevronDown className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    onClick={() => onChange((c) => c.photos.splice(i, 1))}
                    title="Remove from page"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                  <span className="ml-auto text-xs text-muted-foreground">
                    #{i + 1}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ───────────────────────── Login screen ───────────────────────── */

function LoginScreen({
  onSuccess,
  usingDefaultPassword,
}: {
  onSuccess: () => Promise<void>;
  usingDefaultPassword: boolean;
}) {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function handleLogin() {
    if (!password || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Wrong password");
        return;
      }
      await onSuccess();
    } catch {
      setError("Could not log in. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Lock className="size-6" />
        </div>
        <h1 className="text-center text-lg font-bold">My Work — Photo Manager</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Enter the admin password to manage your photos.
        </p>
        <div className="mt-5 space-y-3">
          <Input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void handleLogin();
            }}
            autoFocus
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          {usingDefaultPassword && (
            <p className="text-xs text-muted-foreground">
              No password set yet — the temporary one is <code>ved2026</code>.
              Set your own in docker-compose.yml soon.
            </p>
          )}
          <Button className="w-full" disabled={busy || !password} onClick={handleLogin}>
            {busy && <Loader2 className="mr-2 size-4 animate-spin" />}
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
}
