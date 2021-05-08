const bodyEl = document.querySelector('body') as HTMLBodyElement;
const containerEl = document.createElement('div');
containerEl.setAttribute('class', 'tk-overlay-container');
bodyEl.appendChild(containerEl);

export default containerEl;
