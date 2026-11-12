if (new URLSearchParams(window.location.search).get('font') === '2') {
  document.documentElement.dataset.fontScheme = '2';

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = 'font-scheme-2.css';
  document.head.append(stylesheet);

  document.addEventListener('DOMContentLoaded', () => {
    for (const link of document.querySelectorAll('.language-choice a')) {
      const destination = new URL(link.href);
      destination.searchParams.set('font', '2');
      link.href = destination.href;
    }
  }, { once: true });
}
