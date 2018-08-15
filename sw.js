self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('restaurant').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/data/restaurants.json',
                '/img/',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
            ]).then(() => {
                console.log('Finished caching all files!');
            }).catch((error) => {
                console.log('Caching threw an error: ', error);
            })
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Activating service worker...');
});

self.addEventListener('fetch', (event) => {
    // Do not use service worker for the Google Maps API
    if (event.request.url.indexOf('maps.googleapis.com') !== -1) return;

    event.respondWith(
        caches.open('restaurant').then((cache) => {
            return cache.match(event.request).then((response) => {
                return response || fetch(event.request).then((response) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});