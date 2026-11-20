const stage = document.querySelector('#trim-motion');
const toggle = document.querySelector('#motion-toggle');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
function setPlaying(playing) {
  stage.classList.toggle('trim-paused', !playing);
  toggle.children[0].textContent = playing ? 'Ⅱ' : '▶';
  toggle.children[1].textContent = playing ? 'Pause animation' : 'Play animation';
}
toggle.hidden = false;
setPlaying(!reduced.matches);
toggle.addEventListener('click', () => setPlaying(stage.classList.contains('trim-paused')));
reduced.addEventListener('change', ({matches}) => setPlaying(!matches));
