export type ProjectContentBlock = {
  type: "text" | "image";
  value: string;
};

export function normalizeImageUrl(value: string) {
  return value.replace(/%2520/g, "%20").replace(/ /g, "%20");
}

export type ProjectLocale = "en" | "da";

export type ProjectBaseRow = {
  id: string;
  title: string;
  header: string;
  role: string;
  duration: string;
  summary: string;
  top_image_url: string;
  content_blocks: unknown;
  published: boolean;
  created_at: string;
};

export type ProjectTranslationRow = {
  project_id: string;
  locale: ProjectLocale;
  title: string;
  header: string;
  role: string;
  duration: string;
  summary: string;
  content_blocks: unknown;
};

export type ProjectRecord = {
  id: string;
  title: string;
  header: string;
  role: string;
  duration: string;
  summary: string;
  topImageUrl: string;
  contentBlocks: ProjectContentBlock[];
  published: boolean;
  createdAt: string;
};

export function normalizeProjectContentBlocks(input: unknown): ProjectContentBlock[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const candidate = item as { type?: unknown; value?: unknown };
      const type = candidate.type === "text" || candidate.type === "image" ? candidate.type : null;
      const value = typeof candidate.value === "string" ? candidate.value.trim() : "";

      if (!type || !value) {
        return null;
      }

      return { type, value: type === "image" ? normalizeImageUrl(value) : value };
    })
    .filter((item): item is ProjectContentBlock => item !== null);
}

export function mapProjectRow(row: {
  id: string;
  title: string;
  header: string;
  role: string;
  duration: string;
  summary: string;
  top_image_url: string;
  content_blocks: unknown;
  published: boolean;
  created_at: string;
}): ProjectRecord {
  return {
    id: row.id,
    title: row.title,
    header: row.header,
    role: row.role,
    duration: row.duration,
    summary: row.summary,
    topImageUrl: normalizeImageUrl(row.top_image_url),
    contentBlocks: normalizeProjectContentBlocks(row.content_blocks),
    published: row.published,
    createdAt: row.created_at,
  };
}

function nonEmpty(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : null;
}

export function mapProjectRowWithTranslations(
  row: ProjectBaseRow,
  translations: ProjectTranslationRow[],
  locale: ProjectLocale,
): ProjectRecord {
  const localeTranslation = translations.find((item) => item.locale === locale);
  const englishTranslation = translations.find((item) => item.locale === "en");

  const resolvedTitle =
    nonEmpty(localeTranslation?.title) ??
    nonEmpty(englishTranslation?.title) ??
    row.title;
  const resolvedHeader =
    nonEmpty(localeTranslation?.header) ??
    nonEmpty(englishTranslation?.header) ??
    row.header;
  const resolvedRole =
    nonEmpty(localeTranslation?.role) ??
    nonEmpty(englishTranslation?.role) ??
    row.role;
  const resolvedDuration =
    nonEmpty(localeTranslation?.duration) ??
    nonEmpty(englishTranslation?.duration) ??
    row.duration;
  const resolvedSummary =
    nonEmpty(localeTranslation?.summary) ??
    nonEmpty(englishTranslation?.summary) ??
    row.summary;

  const localizedBlocks = normalizeProjectContentBlocks(localeTranslation?.content_blocks);
  const englishBlocks = normalizeProjectContentBlocks(englishTranslation?.content_blocks);
  const fallbackBlocks = normalizeProjectContentBlocks(row.content_blocks);

  return {
    id: row.id,
    title: resolvedTitle,
    header: resolvedHeader,
    role: resolvedRole,
    duration: resolvedDuration,
    summary: resolvedSummary,
    topImageUrl: normalizeImageUrl(row.top_image_url),
    contentBlocks:
      localizedBlocks.length > 0
        ? localizedBlocks
        : englishBlocks.length > 0
          ? englishBlocks
          : fallbackBlocks,
    published: row.published,
    createdAt: row.created_at,
  };
}
