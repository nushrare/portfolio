const projectFilters = document.querySelector('.work-controls');
if (projectFilters) {
  const buttons = [...projectFilters.querySelectorAll('button')];
  const groups = [...document.querySelectorAll('[data-project-category]')];
  projectFilters.hidden = false;
  projectFilters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    const filter = button.dataset.filter;
    for (const control of buttons) control.setAttribute('aria-pressed', String(control === button));
    for (const group of groups) group.hidden = filter !== 'all' && group.dataset.projectCategory !== filter;
  });
}
