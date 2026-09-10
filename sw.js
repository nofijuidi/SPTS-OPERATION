window.addEventListener('DOMContentLoaded', () => {
  // Register Service Worker for Android & iOS PWA compliance
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker Registered:', reg.scope))
      .catch(err => console.warn('Service Worker Registration Failed:', err));
  }

  // Restore session & check iOS prompt
  const activeSession = sessionStorage.getItem('userSession');
  if (activeSession) {
    currentUser = JSON.parse(activeSession);
    showHomeView();
  }
  checkIosPrompt();
});
