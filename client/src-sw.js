const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// this is the fallback page that will be shown when there is no internet connection
const staticAssetCache = new CacheFirst({ 
  cacheName: 'static-assets',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ]
});

// Cache JS files
registerRoute(
  /.*\.js$/,
  staticAssetCache
);
// Cache CSS files
registerRoute(
  /.*\.css$/,
  staticAssetCache
);
// Cache images
registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif|ico)$/,
  staticAssetCache
);
// Cache fonts
registerRoute(
  /.*\.(?:woff|woff2|ttf|otf|eot)$/,
  staticAssetCache
);