/**
 * Safely resolves an asset path against Vite's BASE_URL.
 * Supports local dev (`/`) and GitHub Pages (`/SHILPSETU/`).
 */
export function resolveAssetUrl(url?: string | null): string {
  if (!url) return '';

  // Remote URLs, data URIs, and blob URIs are untouched
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = url.startsWith('/') ? url.slice(1) : url;

  // Prevent duplicate prefixing if the path already starts with the repo base
  const trimmedBase = base.replace(/^\/|\/$/g, '');
  if (trimmedBase && cleanPath.startsWith(trimmedBase + '/')) {
    return `/${cleanPath}`;
  }

  return `${cleanBase}${cleanPath}`;
}
