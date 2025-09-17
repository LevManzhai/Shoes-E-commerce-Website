// Utility for handling asset paths in production (GitHub Pages)
export function getAssetPath(path) {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // In development, use the path as is
  if (import.meta.env.DEV) {
    return '/' + cleanPath
  }
  
  // In production, prepend the base URL
  return import.meta.env.BASE_URL + cleanPath
}
