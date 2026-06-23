"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProjectContentBlock, ProjectRecord } from "@/lib/projects";

type EditorLocale = "en" | "da";

type LocalizedFields = {
  title: string;
  header: string;
  role: string;
  duration: string;
  summary: string;
};

type LocalePayload = LocalizedFields & {
  blocks: ProjectContentBlock[];
};

type ProjectEditorRecord = ProjectRecord & {
  translations?: Partial<Record<EditorLocale, LocalePayload>>;
};

type EditableBlock = {
  id: string;
  type: ProjectContentBlock["type"];
  imageUrl: string;
  text: Record<EditorLocale, string>;
};

const emptyFields: LocalizedFields = {
  title: "",
  header: "",
  role: "",
  duration: "",
  summary: "",
};

function createBlock(type: "text" | "image"): EditableBlock {
  return {
    id: crypto.randomUUID(),
    type,
    imageUrl: "",
    text: {
      en: "",
      da: "",
    },
  };
}

function toEditableBlocks(project: ProjectEditorRecord): EditableBlock[] {
  const enBlocks = project.translations?.en?.blocks ?? project.contentBlocks;
  const daBlocks = project.translations?.da?.blocks ?? enBlocks;
  const maxLength = Math.max(enBlocks.length, daBlocks.length);

  return Array.from({ length: maxLength }).map((_, index) => {
    const enBlock = enBlocks[index];
    const daBlock = daBlocks[index];
    const type = enBlock?.type ?? daBlock?.type ?? "text";

    if (type === "image") {
      return {
        id: crypto.randomUUID(),
        type,
        imageUrl: (enBlock?.type === "image" ? enBlock.value : daBlock?.value) ?? "",
        text: { en: "", da: "" },
      };
    }

    return {
      id: crypto.randomUUID(),
      type,
      imageUrl: "",
      text: {
        en: enBlock?.type === "text" ? enBlock.value : "",
        da: daBlock?.type === "text" ? daBlock.value : (enBlock?.type === "text" ? enBlock.value : ""),
      },
    };
  });
}

export default function ProjectEditorManager() {
  const [activeLocale, setActiveLocale] = useState<EditorLocale>("en");
  const [fields, setFields] = useState<Record<EditorLocale, LocalizedFields>>({
    en: { ...emptyFields },
    da: { ...emptyFields },
  });
  const [topImageUrl, setTopImageUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadImageError, setUploadImageError] = useState<string | null>(null);
  const [uploadingBlockId, setUploadingBlockId] = useState<string | null>(null);
  const [blockUploadError, setBlockUploadError] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<EditableBlock[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectEditorRecord[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  const hasFilledBlocks = useMemo(
    () =>
      blocks.some((block) =>
        block.type === "image"
          ? block.imageUrl.trim().length > 0
          : block.text.en.trim().length > 0,
      ),
    [blocks],
  );

  const currentFields = fields[activeLocale];

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/admin/projects", { cache: "no-store" });
      const data = (await response.json().catch(() => null)) as
        | { success?: boolean; projects?: ProjectEditorRecord[]; message?: string }
        | null;

      if (!isMounted) return;

      if (!response.ok || !data?.success) {
        setError(data?.message ?? "Could not load projects.");
        setLoading(false);
        return;
      }

      setProjects(Array.isArray(data.projects) ? data.projects : []);
      setLoading(false);
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  function resetForm() {
    setFields({ en: { ...emptyFields }, da: { ...emptyFields } });
    setTopImageUrl("");
    setProjectUrl("");
    setBlocks([]);
    setUploadImageError(null);
    setEditingProjectId(null);
    setActiveLocale("en");
  }

  function updateField(locale: EditorLocale, field: keyof LocalizedFields, value: string) {
    setFields((current) => ({
      ...current,
      [locale]: {
        ...current[locale],
        [field]: value,
      },
    }));
  }

  function startEditing(project: ProjectEditorRecord) {
    const en = project.translations?.en;
    const da = project.translations?.da;

    setFields({
      en: {
        title: en?.title ?? project.title,
        header: en?.header ?? project.header,
        role: en?.role ?? project.role,
        duration: en?.duration ?? project.duration,
        summary: en?.summary ?? project.summary,
      },
      da: {
        title: da?.title ?? en?.title ?? project.title,
        header: da?.header ?? en?.header ?? project.header,
        role: da?.role ?? en?.role ?? project.role,
        duration: da?.duration ?? en?.duration ?? project.duration,
        summary: da?.summary ?? en?.summary ?? project.summary,
      },
    });

    setTopImageUrl(project.topImageUrl);
    setProjectUrl(project.projectUrl ?? "");
    setBlocks(toEditableBlocks(project));
    setEditingProjectId(project.id);
    setMessage(null);
    setError(null);
  }

  function updateBlockText(id: string, locale: EditorLocale, value: string) {
    setBlocks((current) =>
      current.map((block) =>
        block.id === id
          ? { ...block, text: { ...block.text, [locale]: value } }
          : block,
      ),
    );
  }

  function updateBlockImageUrl(id: string, imageUrl: string) {
    setBlocks((current) =>
      current.map((block) => (block.id === id ? { ...block, imageUrl } : block)),
    );
  }

  async function uploadImageFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/projects/upload", {
      method: "POST",
      body: formData,
    });

    const data = (await response.json().catch(() => null)) as
      | { success?: boolean; url?: string; message?: string }
      | null;

    if (!response.ok || !data?.success || !data.url) {
      throw new Error(data?.message ?? "Upload failed.");
    }

    return data.url;
  }

  function removeBlock(id: string) {
    setBlocks((current) => current.filter((block) => block.id !== id));
  }

  function moveBlock(id: string, direction: -1 | 1) {
    setBlocks((current) => {
      const index = current.findIndex((block) => block.id === id);
      if (index === -1) return current;

      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;

      const clone = [...current];
      const [item] = clone.splice(index, 1);
      clone.splice(nextIndex, 0, item);
      return clone;
    });
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadImageError(null);

    try {
      const url = await uploadImageFile(file);
      setTopImageUrl(url);
    } catch (uploadError) {
      setUploadImageError(
        uploadError instanceof Error ? uploadError.message : "Upload failed.",
      );
    } finally {
      setUploadingImage(false);
      if (event.currentTarget) {
        event.currentTarget.value = "";
      }
    }
  }

  async function handleBlockImageUpload(
    blockId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    setUploadingBlockId(blockId);
    setBlockUploadError(null);

    try {
      const url = await uploadImageFile(file);
      updateBlockImageUrl(blockId, url);
    } catch (uploadError) {
      setBlockUploadError(
        uploadError instanceof Error ? uploadError.message : "Upload failed.",
      );
    } finally {
      setUploadingBlockId(null);
      if (event.currentTarget) {
        event.currentTarget.value = "";
      }
    }
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    const payload = {
      id: editingProjectId ?? undefined,
      topImageUrl,
      projectUrl,
      translations: {
        en: {
          ...fields.en,
          blocks: blocks
            .map((block) =>
              block.type === "image"
                ? { type: "image" as const, value: block.imageUrl.trim() }
                : { type: "text" as const, value: block.text.en.trim() },
            )
            .filter((block) => block.value.length > 0),
        },
        da: {
          ...fields.da,
          blocks: blocks
            .map((block) =>
              block.type === "image"
                ? { type: "image" as const, value: block.imageUrl.trim() }
                : {
                    type: "text" as const,
                    value: block.text.da.trim() || block.text.en.trim(),
                  },
            )
            .filter((block) => block.value.length > 0),
        },
      },
    };

    try {
      const response = await fetch("/api/admin/projects", {
        method: editingProjectId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as
        | { success?: boolean; project?: ProjectRecord; message?: string }
        | null;

      if (!response.ok || !data?.success || !data.project) {
        throw new Error(data?.message ?? "Failed to save project.");
      }

      setProjects((current) =>
        editingProjectId
          ? current.map((project) =>
              project.id === editingProjectId
                ? {
                    ...project,
                    ...data.project,
                    projectUrl,
                    translations: payload.translations,
                  }
                : project,
            )
          : [
              {
                ...(data.project as ProjectRecord),
                projectUrl,
                translations: payload.translations,
              },
              ...current,
            ],
      );

      setMessage(editingProjectId ? "Project updated." : "Project saved.");
      resetForm();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to save project.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(projectId: string) {
    setDeletingProjectId(projectId);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/projects?id=${projectId}`, {
        method: "DELETE",
      });

      const data = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (!response.ok || !data?.success) {
        throw new Error(data?.message ?? "Failed to delete project.");
      }

      setProjects((current) => current.filter((project) => project.id !== projectId));

      if (editingProjectId === projectId) {
        resetForm();
      }

      setMessage("Project deleted.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete project.");
    } finally {
      setDeletingProjectId(null);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      <form onSubmit={handleSave} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg shadow-black/10">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">{editingProjectId ? "Edit project" : "Create project"}</h2>
          <p className="text-sm text-[var(--text-muted)]">Enter localized content for English and Danish, then build your custom text/image flow.</p>
        </div>

        <div className="mt-4 inline-flex rounded-xl border border-[var(--border)] bg-[var(--background)] p-1 text-xs font-semibold uppercase tracking-[0.14em]">
          <button type="button" onClick={() => setActiveLocale("en")} className={`rounded-lg px-3 py-2 ${activeLocale === "en" ? "bg-[var(--surface)] text-[var(--foreground)]" : "text-[var(--text-muted)]"}`}>English</button>
          <button type="button" onClick={() => setActiveLocale("da")} className={`rounded-lg px-3 py-2 ${activeLocale === "da" ? "bg-[var(--surface)] text-[var(--foreground)]" : "text-[var(--text-muted)]"}`}>Dansk</button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="text-[var(--text-muted)]">Project title</span>
            <input value={currentFields.title} onChange={(event) => updateField(activeLocale, "title", event.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--border-strong)]" required={activeLocale === "en"} />
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-[var(--text-muted)]">Header</span>
            <input value={currentFields.header} onChange={(event) => updateField(activeLocale, "header", event.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--border-strong)]" required={activeLocale === "en"} />
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-[var(--text-muted)]">Role</span>
            <input value={currentFields.role} onChange={(event) => updateField(activeLocale, "role", event.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--border-strong)]" required={activeLocale === "en"} />
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-[var(--text-muted)]">Duration</span>
            <input value={currentFields.duration} onChange={(event) => updateField(activeLocale, "duration", event.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--border-strong)]" required={activeLocale === "en"} />
          </label>

          <label className="space-y-2 text-sm md:col-span-2">
            <span className="text-[var(--text-muted)]">Top image</span>
            <div className="space-y-2">
              {topImageUrl ? (
                <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)]">
                  <img src={topImageUrl} alt="Project top" className="h-40 w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                    <button type="button" onClick={() => setTopImageUrl("")} className="rounded-lg border border-red-400/50 px-3 py-1 text-sm text-red-200 hover:border-red-300">Remove</button>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--background)] px-4 py-8 text-center text-sm text-[var(--text-muted)]">
                  <p>No image selected</p>
                </div>
              )}

              <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm cursor-pointer disabled:opacity-60" />
              {uploadingImage ? <p className="text-xs text-[var(--text-muted)]">Uploading...</p> : null}
              {uploadImageError ? <p className="text-xs text-red-300">{uploadImageError}</p> : null}
            </div>
          </label>

          <label className="space-y-2 text-sm md:col-span-2">
            <span className="text-[var(--text-muted)]">Short summary</span>
            <textarea value={currentFields.summary} onChange={(event) => updateField(activeLocale, "summary", event.target.value)} rows={4} className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--border-strong)]" required={activeLocale === "en"} />
          </label>

          <label className="space-y-2 text-sm md:col-span-2">
            <span className="text-[var(--text-muted)]">Project page URL</span>
            <input
              value={projectUrl}
              onChange={(event) => setProjectUrl(event.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--border-strong)]"
              placeholder="https://example.com"
            />
          </label>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">Content blocks</h3>
          {blocks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--background)] px-4 py-5 text-sm text-[var(--text-muted)]">No blocks yet. Use the buttons below to add text or image blocks in any order.</div>
          ) : (
            <div className="space-y-4">
              {blocks.map((block, index) => (
                <article key={block.id} className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{block.type} block {index + 1}</span>
                    <div className="flex items-center gap-2 text-xs">
                      <button type="button" onClick={() => moveBlock(block.id, -1)} className="rounded-lg border border-[var(--border)] px-2 py-1 hover:border-[var(--border-strong)]" disabled={index === 0}>Up</button>
                      <button type="button" onClick={() => moveBlock(block.id, 1)} className="rounded-lg border border-[var(--border)] px-2 py-1 hover:border-[var(--border-strong)]" disabled={index === blocks.length - 1}>Down</button>
                      <button type="button" onClick={() => removeBlock(block.id)} className="rounded-lg border border-red-400/50 px-2 py-1 text-red-200 hover:border-red-300">Remove</button>
                    </div>
                  </div>

                  {block.type === "text" ? (
                    <textarea value={block.text[activeLocale]} onChange={(event) => updateBlockText(block.id, activeLocale, event.target.value)} rows={5} className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--border-strong)]" />
                  ) : (
                    <div className="space-y-3">
                      {block.imageUrl ? (
                        <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                          <img src={block.imageUrl} alt={`Block ${index + 1}`} className="h-40 w-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                            <button type="button" onClick={() => updateBlockImageUrl(block.id, "")} className="rounded-lg border border-red-400/50 px-3 py-1 text-sm text-red-200 hover:border-red-300">Remove</button>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-4 py-8 text-center text-sm text-[var(--text-muted)]">
                          <p>No image selected</p>
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleBlockImageUpload(block.id, event)}
                        disabled={uploadingBlockId === block.id}
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm cursor-pointer disabled:opacity-60"
                      />
                      {uploadingBlockId === block.id ? <p className="text-xs text-[var(--text-muted)]">Uploading...</p> : null}
                      {blockUploadError && uploadingBlockId === null ? <p className="text-xs text-red-300">{blockUploadError}</p> : null}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => setBlocks((current) => [...current, createBlock("text")])} className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium hover:border-[var(--border-strong)]">Add text block</button>
          <button type="button" onClick={() => setBlocks((current) => [...current, createBlock("image")])} className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium hover:border-[var(--border-strong)]">Add image block</button>
          <button type="submit" className="rounded-xl border border-teal-400/40 bg-teal-500/20 px-4 py-2 text-sm font-semibold text-teal-100 hover:bg-teal-500/30 disabled:opacity-60" disabled={saving || !hasFilledBlocks}>{saving ? "Saving..." : editingProjectId ? "Update project" : "Save project"}</button>
          {editingProjectId ? (
            <button type="button" onClick={resetForm} className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium hover:border-[var(--border-strong)]">Cancel edit</button>
          ) : null}
        </div>

        {message ? <p className="mt-4 text-sm text-emerald-300">{message}</p> : null}
        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      </form>

      <aside className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg shadow-black/10">
        <h2 className="text-xl font-semibold">Saved projects</h2>
        {loading ? <p className="mt-4 text-sm text-[var(--text-muted)]">Loading...</p> : null}

        {!loading && projects.length === 0 ? <p className="mt-4 text-sm text-[var(--text-muted)]">No saved projects yet.</p> : null}

        <ul className="mt-4 space-y-3">
          {projects.map((project) => (
            <li key={project.id} className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
              {project.topImageUrl ? (
                <img src={project.topImageUrl} alt={project.title} className="mb-3 h-28 w-full rounded-xl object-cover" />
              ) : null}
              <p className="font-semibold text-[var(--foreground)]">{project.title}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">{project.role} • {project.duration}</p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{project.summary}</p>
              {project.projectUrl ? (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-xs font-medium text-[var(--foreground)] hover:border-[var(--border-strong)]"
                >
                  Visit page
                </a>
              ) : null}
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => startEditing(project)} className="rounded-lg border border-[var(--border)] px-3 py-1 text-xs font-medium hover:border-[var(--border-strong)]">Edit</button>
                <button type="button" onClick={() => handleDelete(project.id)} disabled={deletingProjectId === project.id} className="rounded-lg border border-red-400/40 px-3 py-1 text-xs font-medium text-red-200 hover:border-red-300 disabled:opacity-60">{deletingProjectId === project.id ? "Deleting..." : "Delete"}</button>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
