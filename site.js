// Add only the links approved for the public portfolio.
const publicLinks = {
  resume: '', email: '', linkedin: '', github: '', booking: '',
};
const root = document.documentElement;
const cursor = document.querySelector('#loading-cursor');
const directions = [...document.querySelectorAll('[data-direction]')];
function readPreference(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function savePreference(key, value) {
  try { localStorage.setItem(key, value); } catch { /* Preferences are optional. */ }
}
function setDirection(direction) {
  if (!directions.some(button => button.dataset.direction === direction)) return;
  root.dataset.direction = direction;
  directions.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.direction === direction)));
  savePreference('aj-direction', direction);
}
setDirection(readPreference('aj-direction') || 'archive');
directions.forEach(button => button.addEventListener('click', () => setDirection(button.dataset.direction)));
cursor.checked = readPreference('aj-cursor') !== 'off';
if (cursor.checked && document.readyState !== 'complete') root.dataset.loading = 'true';
window.addEventListener('load', () => delete root.dataset.loading, {once:true});
cursor.addEventListener('change', () => {
  savePreference('aj-cursor', cursor.checked ? 'on' : 'off');
  if (!cursor.checked) delete root.dataset.loading;
});
const feelingButtons = [...document.querySelectorAll('[data-feeling]')];
feelingButtons.forEach(button => button.addEventListener('click', () => {
  feelingButtons.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
  document.querySelector('.feedback').textContent = 'You chose ' + button.dataset.feeling.toLowerCase() + '. Take a moment to notice what you need next.';
}));
function addLink(section, label, url, isDownload = false) {
  if (!url) return;
  const link = document.createElement('a');
  link.className = 'button quiet';
  link.href = url;
  link.textContent = label;
  if (isDownload) link.download = '';
  document.querySelector('#' + section + '-links').append(link);
  document.querySelector('#' + section + '-note').hidden = true;
}
addLink('resume', 'Open résumé', publicLinks.resume);
addLink('resume', 'Download résumé', publicLinks.resume, true);
addLink('contact', 'Email me', publicLinks.email ? 'mailto:' + publicLinks.email : '');
addLink('contact', 'LinkedIn', publicLinks.linkedin);
addLink('contact', 'GitHub', publicLinks.github);
addLink('contact', 'Book a conversation', publicLinks.booking);
