// formula-1-fantasy/lib/utils/detect.ts
import { detect, BrowserInfo } from 'detect-browser';

export const isMobile = () => {
  const browser = detect();
  if (browser && 'ua' in browser && typeof browser.ua === 'string') { // Check if 'ua' exists and is a string
    const userAgent = browser.ua; // Now safely treated as a string
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  }
  return false;
};

export const getDeviceType = () => {
  return isMobile() ? 'mobile' : 'desktop';
};