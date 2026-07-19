"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

type DiagnosticMode = "home" | "projects";

type ServerDiagnosticResult = {
  mode: DiagnosticMode;
  locale: Locale;
  error: string | null;
  rowCount: number;
  translationCount: number;
  timings: {
    baseQueryMs: number;
    fallbackQueryMs: number;
    translationsQueryMs: number;
    mappingMs: number;
    totalMs: number;
  };
  imageProbeResults: Array<{
    id: string;
    title: string;
    sourceUrl: string;
    optimizedUrl: string;
    width: number;
    quality: number;
    headStatus: number | null;
    contentType: string | null;
    contentLength: string | null;
    durationMs: number;
    error: string | null;
  }>;
  sampledProjects: Array<{
    id: string;
    title: string;
    header: string;
    imageUrl: string;
  }>;
  generatedAt: string;
};

type BrowserImageProbeResult = {
  title: string;
  url: string;
  durationMs: number;
  width: number;
  height: number;
  error: string | null;
};

type BrowserProbePair = {
  source: BrowserImageProbeResult;
  optimized: BrowserImageProbeResult;
};

interface ProjectDiagnosticsPanelProps {
  initialLocale: Locale;
}

function appendProbeParam(url: string, index: number) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}probe=${Date.now()}-${index}`;
}

function loadImage(url: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new window.Image();

    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };

    image.onerror = () => {
      reject(new Error("Image load failed"));
    };

    image.src = url;
  });
}

export default function ProjectDiagnosticsPanel({ initialLocale }: ProjectDiagnosticsPanelProps) {
  const [mode, setMode] = useState<DiagnosticMode>("home");
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ServerDiagnosticResult | null>(null);
  const [roundTripMs, setRoundTripMs] = useState<number | null>(null);
  const [browserImageResults, setBrowserImageResults] = useState<BrowserProbePair[]>([]);
  const [requestError, setRequestError] = useState<string | null>(null);

  async function measureBrowserImage(title: string, url: string, cacheBusterKey: string) {
    const startedAt = performance.now();

    try {
      const dimensions = await loadImage(appendProbeParam(url, Number(cacheBusterKey)));
      return {
        title,
        url,
        durationMs: Number((performance.now() - startedAt).toFixed(1)),
        width: dimensions.width,
        height: dimensions.height,
        error: null,
      };
    } catch (error) {
      return {
        title,
        url,
        durationMs: Number((performance.now() - startedAt).toFixed(1)),
        width: 0,
        height: 0,
        error: error instanceof Error ? error.message : "Image load failed",
      };
    }
  }

  async function runBrowserImageProbes(serverResult: ServerDiagnosticResult) {
    const probes = await Promise.all(
      serverResult.imageProbeResults.map(async (item, index) => {
        const [source, optimized] = await Promise.all([
          measureBrowserImage(item.title, item.sourceUrl, `${index}1`),
          measureBrowserImage(item.title, item.optimizedUrl, `${index}2`),
        ]);

        return { source, optimized };
      }),
    );

    console.groupCollapsed(`[diagnostics] browser image probes ${serverResult.mode}/${serverResult.locale}`);
    console.table(
      probes.map((probe) => ({
        title: probe.source.title,
        sourceMs: probe.source.durationMs,
        optimizedMs: probe.optimized.durationMs,
        sourceSize: `${probe.source.width}x${probe.source.height}`,
        optimizedSize: `${probe.optimized.width}x${probe.optimized.height}`,
        sourceError: probe.source.error,
        optimizedError: probe.optimized.error,
      })),
    );
    console.groupEnd();
    setBrowserImageResults(probes);
  }

  async function handleRun() {
    setLoading(true);
    setRequestError(null);
    setBrowserImageResults([]);

    const startedAt = performance.now();

    try {
      const response = await fetch(`/api/debug/projects?mode=${mode}&locale=${locale}`, {
        cache: "no-store",
      });
      const json = (await response.json()) as ServerDiagnosticResult;
      const duration = Number((performance.now() - startedAt).toFixed(1));

      setRoundTripMs(duration);
      setResult(json);

      console.groupCollapsed(`[diagnostics] server timings ${mode}/${locale}`);
      console.log("roundTripMs", duration);
      console.log(json);
      console.table(json.imageProbeResults);
      console.groupEnd();

      await runBrowserImageProbes(json);
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : "Diagnostics request failed");
      setRoundTripMs(Number((performance.now() - startedAt).toFixed(1)));
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Diagnostics Controls</h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          This page measures the same project queries used by the home and projects pages, then probes the related header images from both the server and the browser.
        </p>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end">
          <label className="flex flex-col gap-2 text-sm text-[var(--text-soft)]">
            Page slice
            <select
              value={mode}
              onChange={(event) => setMode(event.target.value === "home" ? "home" : "projects")}
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)]"
            >
              <option value="home">Home intro + featured projects</option>
              <option value="projects">Projects listing page</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm text-[var(--text-soft)]">
            Locale
            <select
              value={locale}
              onChange={(event) => setLocale(event.target.value === "da" ? "da" : "en")}
              className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)]"
            >
              <option value="en">English</option>
              <option value="da">Danish</option>
            </select>
          </label>

          <button
            type="button"
            onClick={handleRun}
            disabled={loading}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Running diagnostics..." : "Run diagnostics"}
          </button>
        </div>

        {roundTripMs !== null ? (
          <p className="mt-4 text-sm text-[var(--text-muted)]">API round trip: {roundTripMs} ms</p>
        ) : null}

        {requestError ? (
          <p className="mt-3 text-sm text-red-400">{requestError}</p>
        ) : null}
      </section>

      {result ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">Rows</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{result.rowCount}</p>
            </article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">Base query</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{result.timings.baseQueryMs} ms</p>
            </article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">Translations</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{result.timings.translationsQueryMs} ms</p>
            </article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">Mapping</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{result.timings.mappingMs} ms</p>
            </article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">Total server</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{result.timings.totalMs} ms</p>
            </article>
          </section>

          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Server summary</h2>
              <span className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{result.generatedAt}</span>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-sm text-[var(--text-soft)]">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">Mode</p>
                <p className="mt-2">{result.mode}</p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-sm text-[var(--text-soft)]">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">Locale</p>
                <p className="mt-2">{result.locale}</p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-sm text-[var(--text-soft)]">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">Translations</p>
                <p className="mt-2">{result.translationCount}</p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-sm text-[var(--text-soft)]">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">Fallback query</p>
                <p className="mt-2">{result.timings.fallbackQueryMs} ms</p>
              </div>
            </div>
            {result.error ? (
              <p className="mt-4 text-sm text-red-400">Server error: {result.error}</p>
            ) : null}
          </section>

          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Image probe results</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Server results come from HEAD requests against the raw source URL inside the deployed runtime. Browser results compare the raw source image against the actual Next optimized image path.
            </p>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-[var(--text-soft)]">
                <thead>
                  <tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    <th className="px-3 py-2">Project</th>
                    <th className="px-3 py-2">Source HEAD</th>
                    <th className="px-3 py-2">Source browser</th>
                    <th className="px-3 py-2">Next browser</th>
                    <th className="px-3 py-2">Source status</th>
                    <th className="px-3 py-2">Source size</th>
                  </tr>
                </thead>
                <tbody>
                  {result.imageProbeResults.map((item, index) => {
                    const browserItem = browserImageResults[index];

                    return (
                      <tr key={item.id} className="border-b border-[var(--border)] align-top last:border-b-0">
                        <td className="px-3 py-3">
                          <p className="font-medium text-[var(--foreground)]">{item.title}</p>
                          <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="mt-1 block break-all text-xs text-[var(--text-muted)] hover:text-[var(--foreground)]">
                            source: {item.sourceUrl}
                          </a>
                          <a href={item.optimizedUrl} target="_blank" rel="noreferrer" className="mt-1 block break-all text-xs text-[var(--text-muted)] hover:text-[var(--foreground)]">
                            next: {item.optimizedUrl}
                          </a>
                        </td>
                        <td className="px-3 py-3">{item.durationMs} ms</td>
                        <td className="px-3 py-3">{browserItem ? `${browserItem.source.durationMs} ms` : "-"}</td>
                        <td className="px-3 py-3">{browserItem ? `${browserItem.optimized.durationMs} ms` : "-"}</td>
                        <td className="px-3 py-3">{item.headStatus ?? browserItem?.source.error ?? "error"}</td>
                        <td className="px-3 py-3">{item.contentLength ?? (browserItem ? `${browserItem.source.width}x${browserItem.source.height}` : "-")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Sampled projects</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {result.sampledProjects.map((project) => (
                <article key={project.id} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{project.header}</p>
                  <h3 className="mt-2 text-base font-semibold text-[var(--foreground)]">{project.title}</h3>
                  <p className="mt-2 break-all text-xs text-[var(--text-muted)]">{project.imageUrl}</p>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}