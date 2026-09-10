/**
 * Operation Portal - Global Screen & Touch Management
 * Handles mobile viewport adjustments, full-screen triggers, and gesture lock.
 */

(function () {
  'use strict';

  // 1. Prevent Pinch-to-Zoom on iOS/Android
  document.addEventListener('touchmove', function (e) {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  // 2. Prevent Double-Tap Zooming
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function (e) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // 3. Programmatic Fullscreen Trigger (Used for Android Chrome)
  window.requestAppFullScreen = function () {
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch(() => {});
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen();
    } else if (docEl.msRequestFullscreen) {
      docEl.msRequestFullscreen();
    }
  };

  // 4. Auto-trigger Fullscreen on First User Interaction (Android)
  function triggerOnFirstInteraction() {
    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    
    // Only request fullscreen standard browser mode if not already running standalone
    if (!isStandalone) {
      window.requestAppFullScreen();
    }

    // Lock screen orientation to portrait if supported
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('portrait').catch(() => {});
    }

    document.removeEventListener('click', triggerOnFirstInteraction);
    document.removeEventListener('touchstart', triggerOnFirstInteraction);
  }

  document.addEventListener('click', triggerOnFirstInteraction, { once: true });
  document.addEventListener('touchstart', triggerOnFirstInteraction, { once: true });

  // 5. Dynamic Viewport Height Fix for iOS Safari Bars
  function setRealViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  window.addEventListener('resize', setRealViewportHeight);
  window.addEventListener('orientationchange', setRealViewportHeight);
  setRealViewportHeight();

})();
