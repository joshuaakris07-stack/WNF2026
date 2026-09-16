(() => {
  const music = document.getElementById('successMusic');
  const result = document.getElementById('resultScreen');
  const soundBtn = document.getElementById('soundBtn');
  if (!result) return;

  const VIDEO_ID = 'Ui2-DTFqQMM';
  const START = 0;
  const END = 1200;
  let ambienceFrame = null;
  let firstGestureHandled = false;

  // Disable the old short placeholder audio.
  if (music) {
    music.pause();
    music.removeAttribute('src');
    music.removeAttribute('loop');
    music.load();
  }

  const fallback = document.createElement('button');
  fallback.type = 'button';
  fallback.className = 'result-audio-fallback';
  fallback.textContent = '▶ Play ambience';
  result.appendChild(fallback);

  function isMuted() {
    return !!(soundBtn && soundBtn.textContent.trim() === '×');
  }

  function stopAmbience() {
    if (ambienceFrame) {
      ambienceFrame.remove();
      ambienceFrame = null;
    }
  }

  function playAmbience(restart = false) {
    if (isMuted()) return;
    if (ambienceFrame && !restart) return;
    if (restart) stopAmbience();

    const frame = document.createElement('iframe');
    frame.width = '1';
    frame.height = '1';
    frame.allow = 'autoplay; encrypted-media';
    frame.setAttribute('aria-hidden', 'true');
    frame.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;border:0;';
    frame.src = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&controls=0&loop=1&playlist=${VIDEO_ID}&start=${START}&end=${END}&playsinline=1&rel=0`;
    document.body.appendChild(frame);
    ambienceFrame = frame;
    fallback.classList.remove('show');
  }

  // Try to start the 20-minute ambience as soon as the page opens.
  playAmbience();

  // Browsers may block audible autoplay. The first click/tap/key press restarts
  // the ambience inside a real user gesture so it begins before the code is solved.
  function startOnFirstGesture() {
    if (firstGestureHandled || isMuted()) return;
    firstGestureHandled = true;
    playAmbience(true);
  }

  window.addEventListener('pointerdown', startOnFirstGesture, true);
  window.addEventListener('touchstart', startOnFirstGesture, { capture: true, passive: true });
  window.addEventListener('keydown', startOnFirstGesture, true);

  fallback.addEventListener('click', () => playAmbience(true));

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      setTimeout(() => {
        if (isMuted()) {
          stopAmbience();
        } else {
          firstGestureHandled = true;
          playAmbience(true);
        }
      }, 0);
    });
  }

  // Keep code correction usable from the physical keyboard.
  window.addEventListener('keydown', event => {
    if (result.classList.contains('show')) return;
    if (event.key === 'Delete') {
      const del = document.querySelector('[data-action="delete"]');
      if (del) del.click();
    }
  }, true);
})();