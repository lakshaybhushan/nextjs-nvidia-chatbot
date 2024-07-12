const idToRequestCount = new Map<string, number>();
const rateLimiter = {
  windowStart: Date.now(),
  windowSize: 60 * 60 * 1000,
  maxRequests: 10, // 10 requests per hour per IP address
};

export const rateLimit = (ip: string) => {
  const now = Date.now();
  const isNewWindow = now - rateLimiter.windowStart > rateLimiter.windowSize;
  if (isNewWindow) {
    rateLimiter.windowStart = now;
    idToRequestCount.set(ip, 0);
  }

  const currentRequestCount = idToRequestCount.get(ip) ?? 0;
  if (currentRequestCount >= rateLimiter.maxRequests) return true;
  idToRequestCount.set(ip, currentRequestCount + 1);

  return false;
};
