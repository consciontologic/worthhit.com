/* Static-shell registration. API requests and private content are never cached. */
(() => {
  const release = '4dd8b25748d2b85bbf75dbc774bc182466413e0d64347ab0d74c45d6e2113650';
  if (!('serviceWorker' in navigator)) return;
  const identify = () => navigator.serviceWorker.controller?.postMessage({
    type: 'CLIENT_RELEASE', release
  });
  navigator.serviceWorker.addEventListener('controllerchange', identify);
  navigator.serviceWorker.register('service_worker.js', {updateViaCache: 'none'})
    .then(registration => {
      identify();
      // Discovery never activates an update or reloads an unfinished form.
      registration.update().catch(() => {});
    })
    .catch(() => {
      // Core online use remains available if this browser refuses installation.
      document.documentElement.dataset.pwaUnavailable = 'true';
    });
})();
