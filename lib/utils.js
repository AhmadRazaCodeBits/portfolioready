export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateStr) {
  if (!dateStr || dateStr === 'Present') return 'Present';
  return dateStr;
}

export function getInitials(name) {
  if (!name) return '??';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str, maxLength = 150) {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

export async function fetcher(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Something went wrong' }));
    throw new Error(error.message || 'API error');
  }
  return res.json();
}
