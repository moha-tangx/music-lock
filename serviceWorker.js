"use strict";
// @ts-check

let version = "music-app-v1";

/*resources to be initially cached when app is being installed*/
let resources = [
  "./",
  "./index.html",
  "./style.css",
  "./index.js",
  "./images/image-144.jpg",
  "./images/image.jpg",
  "./images/marvels-spider-man.jpg",
  "./images/mobile.jpg",
  "./images/pebbles.jpg",
  "./manifest.json",
];

/*cache resources function that cahce all the static asssets at intall*/
let cacheResources = async (resources) => {
  let cache = await caches.open(version);
  cache.addAll(resources);
};

let cacheFirst = async (request) => {
  let serverRes = await fetch(request);
  let cache = await caches.open(version);
  let cached = await caches.match(request);

  if (serverRes.ok) {
    return serverRes;
    /*returns the response from the server if the request is sucessful*/
  }
  if (cached) {
    return cached;
    /*return the cached recourses if the request from the server is not sucessful and the cached data matches the response sent*/
  }
  if (request.method !== "GET" && !serverRes.ok) {
    return;
    /*returns if the method is not get and the request is not sucessful*/
  }
  cache.put(request, serverRes.clone());
  return serverRes;
};

/***** eventlisteners *****/
self.addEventListener("install", async (e) => {
  e.waitUntil(cacheResources(resources));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(cacheFirst(e.request));
});
