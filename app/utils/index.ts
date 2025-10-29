export function generateId(prefix = "") {
  return prefix + Math.random().toString(36).slice(2, 9);
}

export function saveAdminMapping(roomId: string, mapping: unknown) {
  // Save mapping in admin localStorage under key `sorteio:{roomId}`
  localStorage.setItem(`sorteio:${roomId}:mapping`, JSON.stringify(mapping));
}

export function loadAdminMapping(roomId: string) {
  const raw = localStorage.getItem(`sorteio:${roomId}:mapping`);
  return raw ? JSON.parse(raw) : null;
}
