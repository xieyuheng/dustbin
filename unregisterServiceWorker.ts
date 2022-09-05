async function unregisterServiceWorker(): Promise<void> {
  const registrations = await navigator.serviceWorker.getRegistrations()
  for (let registration of registrations) {
    registration.unregister()
  }
}

unregisterServiceWorker()
