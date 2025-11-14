export function not_authorized(push: (path: string) => void) {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  if (currentPath.includes(`/room/`)) {
    push("/room");
  }
}
