const floorViewer = document.querySelector('#floor-viewer');
const floorLinks = Array.from(document.querySelectorAll('.floor-photo a'));
const floorImage = floorViewer.querySelector('img');
const floorCaption = floorViewer.querySelector('.floor-controls p');
let currentFloorPhoto = 0;

function showFloorPhoto(index) {
  currentFloorPhoto = (index + floorLinks.length) % floorLinks.length;
  const link = floorLinks[currentFloorPhoto];
  floorImage.src = link.href;
  floorImage.alt = link.querySelector('img').alt;
  floorCaption.textContent = link.nextElementSibling.textContent + ' · ' +
    (currentFloorPhoto + 1) + ' / ' + floorLinks.length;
}

floorLinks.forEach((link, index) => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    showFloorPhoto(index);
    floorViewer.showModal();
  });
});

floorViewer.querySelectorAll('[data-step]').forEach(button => {
  button.addEventListener('click', () => showFloorPhoto(currentFloorPhoto + Number(button.dataset.step)));
});

floorViewer.addEventListener('keydown', event => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  showFloorPhoto(currentFloorPhoto + (event.key === 'ArrowLeft' ? -1 : 1));
});
