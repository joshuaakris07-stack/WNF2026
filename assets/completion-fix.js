(() => {
  const music = document.getElementById('successMusic');
  const unlock = document.getElementById('unlockBtn');
  const result = document.getElementById('resultScreen');
  const soundBtn = document.getElementById('soundBtn');
  if (!unlock || !result) return;

  const VIDEO_ID = 'Ui2-DTFqQMM';
  const START = 0;
  const END = 1200;
  let ambienceFrame = null;

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

  function enteredCode() {
    return [...document.querySelectorAll('.digit-slot')]
      .map(el => el.textContent.trim())
      .join('');
  }

  function stopAmbience() {
    if (ambienceFrame) {
      ambienceFrame.remove();
      ambienceFrame = null;
    }
  }

  function playAmbience() {
    stopAmbience();
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

  unlock.addEventListener('click', () => {
    if (enteredCode() !== '1812') return;
    playAmbience();
  }, true);

  fallback.addEventListener('click', playAmbience);

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      setTimeout(() => {
        const muted = soundBtn.textContent.trim() === '×';
        if (muted) stopAmbience();
        else if (result.classList.contains('show')) playAmbience();
      }, 0);
    });
  }

  window.addEventListener('keydown', event => {
    if (result.classList.contains('show')) return;
    if (event.key === 'Delete') {
      const del = document.querySelector('[data-action="delete"]');
      if (del) del.click();
    }
  }, true);
})();