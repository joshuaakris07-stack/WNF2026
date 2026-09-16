(() => {
  const music = document.getElementById('successMusic');
  const unlock = document.getElementById('unlockBtn');
  const result = document.getElementById('resultScreen');
  if (!music || !unlock || !result) return;

  // Cache-bust the previously broken audio file and preload the replacement.
  music.src = '/assets/success-music.mp3?v=5';
  music.volume = 0.62;
  music.preload = 'auto';
  music.load();

  const fallback = document.createElement('button');
  fallback.type = 'button';
  fallback.className = 'result-audio-fallback';
  fallback.textContent = '▶ Play ambience';
  result.appendChild(fallback);

  function enteredCode() {
    return [...document.querySelectorAll('.digit-slot')].map(el => el.textContent.trim()).join('');
  }

  function playMusic() {
    music.muted = false;
    const p = music.play();
    if (p && typeof p.then === 'function') {
      p.then(() => fallback.classList.remove('show'))
       .catch(() => fallback.classList.add('show'));
    }
  }

  // Play synchronously inside the Unlock button's real user click gesture.
  unlock.addEventListener('click', () => {
    if (enteredCode() !== '1812') return;
    music.currentTime = 0;
    playMusic();
  }, true);

  fallback.addEventListener('click', playMusic);

  // Keep code correction usable from both the keypad and physical keyboard.
  window.addEventListener('keydown', (event) => {
    if (result.classList.contains('show')) return;
    if (event.key === 'Delete') {
      const del = document.querySelector('[data-action="delete"]');
      if (del) del.click();
    }
  }, true);
})();