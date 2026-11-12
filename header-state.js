const header = document.querySelector('.site-header');
const landing = document.querySelector('#top');
const loader = document.querySelector('#page-loading');

function syncHeader() {
  header.toggleAttribute('data-past-landing', landing.getBoundingClientRect().bottom <= header.getBoundingClientRect().bottom + 1);
}

let scheduled = false;
function scheduleHeader() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    syncHeader();
  });
}

syncHeader();
window.addEventListener('scroll', scheduleHeader, {passive:true});
window.addEventListener('resize', scheduleHeader);
window.addEventListener('hashchange', scheduleHeader);
window.addEventListener('pageshow', scheduleHeader);
window.addEventListener('load', scheduleHeader, {once:true});

if (document.readyState !== 'complete') {
  const showTimer = setTimeout(() => { loader.hidden = false; }, 180);
  const timeout = setTimeout(finish, 12000);
  function finish() {
    clearTimeout(showTimer);
    clearTimeout(timeout);
    loader.hidden = true;
  }
  window.addEventListener('load', finish, {once:true});
  window.addEventListener('pageshow', finish, {once:true});
}
