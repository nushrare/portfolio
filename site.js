// Add only the links approved for the public portfolio.
const publicLinks = {
  resume: '', email: '', linkedin: '', github: '', booking: '',
};
const root = document.documentElement;
if (document.readyState !== 'complete') root.dataset.loading = 'true';
window.addEventListener('load', () => delete root.dataset.loading, {once:true});
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
