const theme = JSON.parse(localStorage.getItem('tab-of-words-theme') ?? '"sunrise"');
const root = window.document.documentElement;

root.classList.remove('sunset', 'sunrise', 'moon');
root.classList.add(theme);
