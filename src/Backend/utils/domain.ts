// src/utils/domains.ts
export const myCodeDomain = "https://github.com/sathish-kumar-repo";
export const myLiveDomain = "https://sathish-kumar-repo.github.io";
export const DOMAINS = {
  a: "https://sathish-kumar-repo.github.io/storage1/",
  b: "https://your-second-domain.com/",
  c: "https://your-third-domain.com/",
  // Add more as needed...
};

export type DomainKey = keyof typeof DOMAINS;

export const getDomainUrl = (
  domainKey?: DomainKey,
  customDomain?: string
): string => {
  if (customDomain) return customDomain;
  if (!domainKey || !DOMAINS[domainKey]) {
    // console.warn(`Invalid or missing domainKey "${domainKey}". Using default.`);
    return DOMAINS.a;
  }
  return DOMAINS[domainKey];
};

export const normalizeUrl = (url: string, baseDomain: string) => {
  if (/^(http|https|\/)/.test(url)) return url;
  return `${baseDomain}${url}`;
};

// 💡 Dynamically detect boolean domain key (like a, b, c)
export const resolveDomainKeyFromProps = (
  props: Record<string, any>
): DomainKey | undefined => {
  const domainFlags = Object.keys(DOMAINS);
  const activeFlags = domainFlags.filter((key) => props[key]);
  if (activeFlags.length > 1) {
    console.error("⚠️ Only one domain key should be used as a boolean prop.");
    return undefined;
  }
  return activeFlags[0] as DomainKey;
};
