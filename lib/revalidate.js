/**
 * Triggers on-demand revalidation of the public site.
 * Call this after any admin create/update/delete operation
 * so the public homepage reflects changes immediately.
 */
export async function revalidatePublicSite() {
  try {
    await fetch('/api/revalidate', { method: 'POST' });
  } catch (err) {
    // Non-critical — ISR will catch up within 60s anyway
    console.warn('Revalidation request failed (non-critical):', err.message);
  }
}
