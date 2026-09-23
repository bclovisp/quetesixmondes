/* Service worker de « La Quête des Six Mondes »
   Stratégie : réseau d’abord, cache en secours.
   Le jeu se met donc à jour tout seul dès qu’il y a du réseau,
   et reste jouable hors ligne après une première ouverture connectée. */

const CACHE = "six-mondes-v1";

const COQUILLE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(COQUILLE))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(noms => Promise.all(noms.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (!req.url.startsWith("http")) return;

  e.respondWith(
    fetch(req)
      .then(rep => {
        // On garde une copie : page, icônes et polices Google incluses.
        const copie = rep.clone();
        caches.open(CACHE).then(c => c.put(req, copie)).catch(() => {});
        return rep;
      })
      .catch(() =>
        caches.match(req).then(hit => {
          if (hit) return hit;
          if (req.mode === "navigate") return caches.match("./index.html");
          return new Response("", { status: 504, statusText: "Hors ligne" });
        })
      )
  );
});
