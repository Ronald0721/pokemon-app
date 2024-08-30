export function getParams(index: number): string | null {
  const pathSegments = window.location.pathname.split("/");
  return pathSegments[index] || null;
}
