const API_KEY = 'AIzaSyD3WdTxeTZ9YGZw8SrMyuuG7A2c7dPrltc';
const CALLBACK_NAME = 'googleMapsCallback';

let initialized = !!(window as any).google;

let resolveInitPromise: any;
let rejectInitPromise: any;

const initPromise = new Promise((resolve, reject) => {
  resolveInitPromise = resolve;
  rejectInitPromise = reject;
});

export default function init() {
  if (initialized) { return initPromise; }

  initialized = true;
  (window as any)[CALLBACK_NAME] = () => resolveInitPromise((window as any).google);

  const head = document.querySelector('head') || document.createElement('head');
  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`;
  script.onerror = rejectInitPromise;
  head.appendChild(script);

  return initPromise;
}
