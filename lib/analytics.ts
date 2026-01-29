"use client";

import { getAnalytics } from "firebase/analytics";
import { app } from "./firebase";

let analytics;

export function getAnalyticsInstance() {
  if (typeof window !== 'undefined' && !analytics) {
    analytics = getAnalytics(app);
  }
  return analytics;
}
