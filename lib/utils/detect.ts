"use client";

import { detect } from 'detect-browser';

export const isMobile = () => {
  const browser = detect();
  if (browser) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(browser.ua);
  }
  return false;
};

export const getDeviceType = () => {
  return isMobile() ? 'mobile' : 'desktop';
};