/*
Credits Service Worker to Matt Gaunt
https://developers.google.com/web/fundamentals/primers/service-workers/
*/

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    "./",
    "index.html",
    "restaurant.html",
    "css/styles.css",
    "data/restaurants.json",
    "js/dbhelper.js",
    "js/main.js",
    "js/restaurant_info.js",
    "img/1.jpg",
    "img/2.jpg",
    "img/3.jpg",
    "img/4.jpg",
    "img/5.jpg",
    "img/6.jpg",
    "img/7.jpg",
    "img/8.jpg",
    "img/9.jpg",
    "img/10.jpg"
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            //console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function(event) {

    var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", event => {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(response => {
                if (response) {
                    // console.log("[ServiceWorker] Found in cache ", event.request.url);
                    return response;
                }
                return fetch(event.request);
            })
        );
    }
});