const floorViewer = document.querySelector('#floor-viewer');
const floorLinks = Array.from(document.querySelectorAll('.floor-photo a'));
const floorImage = floorViewer.querySelector('img');
const floorCaption = floorViewer.querySelector('.floor-controls p');
let currentFloorPhoto = 0;
let activeFloorLinks = floorLinks;

function showFloorPhoto(index) {
  currentFloorPhoto = (index + activeFloorLinks.length) % activeFloorLinks.length;
  const link = activeFloorLinks[currentFloorPhoto];
  floorImage.src = link.href;
  floorImage.alt = link.querySelector('img').alt;
  floorCaption.textContent = link.nextElementSibling.textContent + ' · ' +
    (currentFloorPhoto + 1) + ' / ' + activeFloorLinks.length;
}

floorLinks.forEach((link, index) => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    activeFloorLinks = Array.from(link.closest('.factory-panel').querySelectorAll('.floor-photo a'));
    showFloorPhoto(activeFloorLinks.indexOf(link));
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

// Factory tabs support pointer, touch and keyboard navigation.
const factoryTabs = Array.from(document.querySelectorAll('.factory-tabs [role="tab"]'));
function selectFactory(tab) {
  factoryTabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
}
factoryTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectFactory(tab));
  tab.addEventListener('keydown', event => {
    const offsets = { ArrowRight: 1, ArrowLeft: -1 };
    let next;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = factoryTabs.length - 1;
    else if (event.key in offsets) next = (index + offsets[event.key] + factoryTabs.length) % factoryTabs.length;
    else return;
    event.preventDefault();
    selectFactory(factoryTabs[next]);
    factoryTabs[next].focus();
  });
});

const requestedFactory = factoryTabs.find(tab => "#" + tab.getAttribute("aria-controls") === location.hash);
if (requestedFactory) selectFactory(requestedFactory);
