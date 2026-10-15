/* Light/dark switch in the header.
   Until a visitor uses it, the site follows their system setting. A choice is saved in this
   browser (localStorage "theme") and applied before the page is drawn by the small script in
   _includes/head.html. Switching back to the theme the system already uses forgets the choice,
   so the site follows the system again. Without JavaScript the button stays hidden and the
   system setting still applies. */
(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  if (!button) return;
  var system = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var metas = Array.prototype.slice.call(document.querySelectorAll('meta[name="theme-color"]'));
  metas.forEach(function (m) { m.setAttribute('data-default', m.content); });

  function systemTheme() { return system && system.matches ? 'dark' : 'light'; }
  function currentTheme() { return root.getAttribute('data-theme') || systemTheme(); }

  function save(theme) {
    try {
      if (theme) localStorage.setItem('theme', theme);
      else localStorage.removeItem('theme');
    } catch (e) {}
  }

  function apply(theme) {
    if (theme === 'light' || theme === 'dark') root.setAttribute('data-theme', theme);
    else root.removeAttribute('data-theme');
    update();
  }

  // Button state, and the browser toolbar colour (theme-color), which always follows --bg.
  function update() {
    var dark = currentTheme() === 'dark';
    button.setAttribute('aria-pressed', dark ? 'true' : 'false');
    button.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
    var bg = getComputedStyle(root).getPropertyValue('--bg').trim();
    metas.forEach(function (m) { m.content = bg || m.getAttribute('data-default'); });
  }

  button.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    var theme = next === systemTheme() ? null : next;
    save(theme);
    apply(theme);
  });

  // Follow system changes, and choices made in another tab.
  if (system) {
    if (system.addEventListener) system.addEventListener('change', update);
    else if (system.addListener) system.addListener(update);
  }
  window.addEventListener('storage', function (e) {
    if (e.key === 'theme' || e.key === null) apply(e.newValue);
  });

  button.hidden = false;
  update();
})();
