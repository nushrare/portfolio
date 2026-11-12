const header = document.querySelector('.site-header');
const landing = document.querySelector('#top');
const work = document.querySelector('#work');
const contact = document.querySelector('#contact');
const loader = document.querySelector('#page-loading');

function syncHeader() {
  const anchorInset = parseFloat(getComputedStyle(work).scrollMarginTop) || 0;
  const boundary = Math.max(anchorInset, header.getBoundingClientRect().bottom);
  header.toggleAttribute('data-at-contact', contact.getBoundingClientRect().top <= boundary + 2);
  header.toggleAttribute('data-past-landing', landing.getBoundingClientRect().bottom <= boundary + 1);
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

let arrivalPlaying = false;
const homeLink = header.querySelector('.home-link');
homeLink.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  event.preventDefault();
  if (location.hash !== '#top') history.pushState(null, '', '#top');
  window.scrollTo({top:0, behavior:'instant'});
  syncHeader();
  playArrival();
});

if (!playArrival() && document.readyState !== 'complete') {
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

function playArrival() {
  const arrival = document.querySelector('#arrival');
  const mark = arrival.querySelector('.arrival-mark');
  const target = landing.querySelector('.signature-mark');
  const skip = arrival.querySelector('.arrival-skip');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (arrivalPlaying || (location.hash && location.hash !== '#top') || scrollY > 20 || reduced.matches || typeof mark.animate !== 'function') return false;

  arrivalPlaying = true;
  let animation;
  let done = false;
  const timer = setTimeout(dock, 2370);
  const cutoff = setTimeout(finish, 3500);
  arrival.hidden = false;
  target.classList.add('is-arriving');
  skip.addEventListener('click', finish);
  window.addEventListener('keydown', onKey);
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('pagehide', finish, {once:true});
  reduced.addEventListener?.('change', finish);

  function onKey(event) { if (event.key === 'Escape') finish(); }
  function onScroll() { if (scrollY > 20) finish(); }
  function dock() {
    const from = mark.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const dx = to.left + to.width / 2 - from.left - from.width / 2;
    const dy = to.top + to.height / 2 - from.top - from.height / 2;
    arrival.classList.add('is-docking');
    animation = mark.animate([{transform:'none'}, {transform:`translate(${dx}px,${dy}px) scale(${to.width/from.width})`}], {
      duration: 630, easing:'cubic-bezier(.22,.65,.25,1)', fill:'forwards'
    });
    animation.onfinish = finish;
  }
  function finish() {
    if (done) return;
    done = true;
    arrivalPlaying = false;
    clearTimeout(timer);
    clearTimeout(cutoff);
    if (document.activeElement === skip) header.querySelector('.home-link').focus({preventScroll:true});
    arrival.hidden = true;
    target.classList.remove('is-arriving');
    animation?.cancel();
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('pagehide', finish);
    reduced.removeEventListener?.('change', finish);
  }
  return true;
}
