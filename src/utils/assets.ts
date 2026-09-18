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

  // Strip leading slash and any obsolete or current base prefixes (e.g. 'SIH-WEBSITE/', 'SHILPSETU/')
  let cleanPath = url.startsWith('/') ? url.slice(1) : url;
  cleanPath = cleanPath.replace(/^(SIH-WEBSITE|SHILPSETU)\//, '');

  return `${cleanBase}${cleanPath}`;
}
