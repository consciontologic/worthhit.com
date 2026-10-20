/* Static-shell registration. API requests and private content are never cached. */
(() => {
  const release = 'ef541b79ea83edbcc4157061da168a6eae4079990a1da932eb2ae75dd0a53f03';
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
