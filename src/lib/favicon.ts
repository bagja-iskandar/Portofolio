'use client';

export type LensVariant = 'threshold' | 'structure' | 'expression';

/**
 * Dynamic Favicon Switcher
 * Dynamically swaps the browser tab favicon to reflect the active modality:
 * - 'threshold': Duality seam variant (/brand/bij-logo-threshold.svg)
 * - 'structure': Obsidian Blueprint variant (/brand/bij-logo-structure.svg)
 * - 'expression': Ivory Editorial variant (/brand/bij-logo-expression.svg)
 */
export function setDynamicFavicon(lens: LensVariant) {
  if (typeof window === 'undefined') return;

  const iconMap: Record<LensVariant, string> = {
    threshold: '/brand/bij-logo-threshold.svg',
    structure: '/brand/bij-logo-structure.svg',
    expression: '/brand/bij-logo-expression.svg',
  };

  const targetUrl = iconMap[lens] || iconMap.threshold;

  // Remove existing icon tags to force browser to repaint tab icon
  const existingLinks = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
  existingLinks.forEach((el) => el.remove());

  // Create new SVG icon link
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = targetUrl;
  document.head.appendChild(link);

  // Shortcut icon for broad browser compatibility
  const shortcut = document.createElement('link');
  shortcut.rel = 'shortcut icon';
  shortcut.type = 'image/svg+xml';
  shortcut.href = targetUrl;
  document.head.appendChild(shortcut);
}
