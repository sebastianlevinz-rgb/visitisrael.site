// IndexNow protocol helper — pings search engines on content publish/update.
// Spec: https://www.indexnow.org/documentation
// Key file lives at https://visitisrael.site/<INDEXNOW_KEY>.txt (committed in public/).

export interface IndexNowConfig {
  host: string;
  key: string;
  keyLocation?: string;
}

export async function indexNowPing(
  urls: string[],
  config: IndexNowConfig,
): Promise<Response> {
  const body = {
    host: config.host,
    key: config.key,
    keyLocation:
      config.keyLocation ?? `https://${config.host}/${config.key}.txt`,
    urlList: urls,
  };
  return fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
}

export function indexNowConfigFromEnv(): IndexNowConfig | null {
  const key = process.env.INDEXNOW_KEY;
  const host = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? 'visitisrael.site';
  if (!key) return null;
  return { host, key };
}
