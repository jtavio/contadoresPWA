const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./style.css",
    "./components/Contador.js"
];

const CACHE_NAME = "v3_app_contador_react"


self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((c) => {
            c.addAll(CACHE_ELEMENTS).then(() => {
                self.skipWaiting()
            }).catch((e) => {
                console.log(e)
            })
        })
    )
});

self.addEventListener("activate", (e) => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then((cacheName) => {
            return Promise.all(cacheName.map(cacheName => {
                return cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName);
            }))
        }).then(() => {
            self.clients.claim()
        })

    )
})

self.addEventListener("fetch", (e) => {
    //console.log(e.request)
    e.respondWith(
        caches.match(e.request).then((resp) => {
          if(resp){
              return resp
          }
          return fetch(e.request)
            //console.log(resp)
        })
    )
}) 