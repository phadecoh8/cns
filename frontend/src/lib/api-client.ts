const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function getApiUrl(path: string) {
  if (!apiUrl) {
    throw new Error('The CNS API is not configured.');
  }

  return new URL(path, apiUrl).toString();
}
