if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((reg) => {
                console.log('Service worker registered.', reg);
                // (function (w, d, s, id) {
                //     if (typeof (w.webpushr) !== 'undefined') return; w.webpushr = w.webpushr || function () { (w.webpushr.q = w.webpushr.q || []).push(arguments) }; var js, fjs = d.getElementsByTagName(s)[0]; js = d.createElement(s); js.id = id; js.async = 1; js.src = "https://cdn.webpushr.com/app.min.js";
                //     fjs.parentNode.appendChild(js);
                // }(window, document, 'script', 'webpushr-jssdk'));
                // webpushr('setup', { 'key': 'BFJgDza0UmNUdVQwYfulmVY9Z5kDjR_mUopMZGaUYL43DBEkC3opfw09TDVi5C1p2BXajKPOO5nyywmZ2wiDAME' });
                // webpushr('init', 'long-gibberish-key-here', '/service-worker.js');
            });
    });
}
//importScripts('https://cdn.webpushr.com/sw-server.min.js');
const version = "0.001";
const cacheName = `timer-${version}`;
caches.keys().then(function (keyList) {
    return Promise.all(keyList.map(function (key) {
        //if version changed
        if (key !== cacheName) {
            setTimeout(function () {
                location.reload();
            }, 3000);
        }
    }));
})
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                '/?v0.001',
                '/manifest.webmanifest',
                '/index.html',
                '/favicon/16x16.png',
                '/favicon/192x192.png',
                '/favicon/32x32.png',
                '/favicon/512x512.png',
                '/favicon/apple-touch-icon.png',
                //css
                '/style.css?v0.001',
                //images
                '/images/bg.png',
                //fonts
                '/fonts/ArtemusRegular.ttf',
                '/fonts/ArtemusRegular.woff',
                '/fonts/ArtemusRegular.woff2',
                //js
                '/scripts.js?v0.001'
            ]).then(() => self.skipWaiting());
        })
    );
});
self.addEventListener('activate', event => {
    var cacheKeeplist = [cacheName];
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheKeeplist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
            .then(cache => cache.match(event.request, { ignoreSearch: true }))
            .then(response => {
                return response || fetch(event.request);
            })
    );
});