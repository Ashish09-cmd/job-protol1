/** Temporary client id for a new list entry. The API assigns the real id. */
export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `new-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
