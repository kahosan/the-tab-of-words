export default async function fetcher<T>(key: string) {
  const res = await fetch(key);

  if (!res.ok)
    throw new Error('Failed to fetch data');

  const data = res.headers.get('Content-Type')?.includes('application/json')
    ? await res.json()
    : await res.text();

  return data as T;
}
