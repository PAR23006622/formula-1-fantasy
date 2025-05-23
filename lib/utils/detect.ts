"use client";

import { detect } from 'detect-browser';

export const isMobile = () => {
  if (typeof navigator !== 'undefined') {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  return false;
};

export const getDeviceType = () => {
  return isMobile() ? 'mobile' : 'desktop';
};