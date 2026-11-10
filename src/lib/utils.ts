type EventParams = Record<string, string | number | boolean>;
type Gtag = (command: "event", eventName: string, params?: EventParams) => void;

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window !== "undefined") {
    const analytics = window as Window & { gtag?: Gtag };
    if (typeof analytics.gtag === "function") {
      analytics.gtag("event", eventName, params);
    }
  }
  if (process.env.NODE_ENV === "development") {
    console.log("[Track]", eventName, params);
  }
}
