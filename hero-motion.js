const stage = document.querySelector("#trim-motion");
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
function applyMotionPreference() {
  stage.classList.toggle("trim-paused", reduced.matches);
}
applyMotionPreference();
reduced.addEventListener("change", applyMotionPreference);
