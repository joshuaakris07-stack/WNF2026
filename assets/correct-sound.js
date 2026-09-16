(() => {
  const unlock = document.getElementById('unlockBtn');
  const soundButton = document.getElementById('soundBtn');
  if (!unlock) return;

  const effect = new Audio('/assets/correct-code.mp3?v=1');
  effect.preload = 'auto';
  effect.volume = 1;

  function muted() {
    return !!(soundButton && soundButton.textContent.trim() === '×');
  }

  function enteredCode() {
    return [...document.querySelectorAll('.digit-slot')]
      .map(slot => slot.textContent.trim())
      .join('');
  }

  unlock.addEventListener('click', () => {
    if (unlock.disabled || muted() || enteredCode() !== '1812') return;
    effect.pause();
    effect.currentTime = 0;
    const playback = effect.play();
    if (playback && typeof playback.catch === 'function') playback.catch(() => {});
  }, true);
})();