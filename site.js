const root = document.documentElement;
if (document.readyState !== 'complete') root.dataset.loading = 'true';
window.addEventListener('load', () => delete root.dataset.loading, {once:true});
