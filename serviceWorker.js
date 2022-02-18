// Permite que la aplicación pueda trabajar OFFLINE
const CACHE_NAME = "v1_cache_contador_app";
const urlsToCache = [
    "./",
    "./resources/favicon.png",
    "./resources/icon_16.png",
    "./resources/icon_32.png",
    "./resources/icon_64.png",
    "./resources/icon_128.png",
    "./resources/icon_256.png",
    "./resources/icon_512.png",
    "./resources/icon_1024.png",
    "./resources/icon_4096.png",
    "./js/main.js",
    "./js/mountApp.js",
    "./css/style.css",
    "https://unpkg.com/vue@next",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(urlsToCache).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    )
});

self.addEventListener("activate", e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if(cacheWhitelist.indexOf(cacheName) === -1) {
                                return caches.delete(cacheName)
                            }
                        }
                    )
                )
            }
        ).then(
            () => self.clients.claim()
        )
    )
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(
            response => {
                if(response) {
                    return response
                }
                return fetch(e.request)
            }
        )
    )
});