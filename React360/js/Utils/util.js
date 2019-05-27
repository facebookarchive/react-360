import isMobile from 'ismobilejs';

const ocbReg = /oculus/i;
const mobileVR = /Mobile\sVR/i;

export function isMobileBrowser():boolean {
  const ua = navigator.userAgent.toLowerCase();
  if (ocbReg.test(ua) || mobileVR.test(ua)) {
    return false;
  }
  return isMobile.any;
}

export function isOculus():boolean {
  const ua = navigator.userAgent.toLowerCase();
  return ocbReg.test(ua);
}
