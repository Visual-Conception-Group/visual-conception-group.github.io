/* Drop-down menus in the header (items with `links` in _data/navigation.yml). They are plain
   <details> elements, so they open and close without JavaScript; this script only closes an open
   menu when the visitor presses Esc, clicks elsewhere, or opens another one. */
(function () {
  var menus = Array.prototype.slice.call(document.querySelectorAll('.nav-menu'));
  if (!menus.length) return;

  function closeAll(except) {
    menus.forEach(function (m) { if (m !== except) m.open = false; });
  }

  menus.forEach(function (m) {
    m.addEventListener('toggle', function () { if (m.open) closeAll(m); });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.nav-menu')) closeAll();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = menus.filter(function (m) { return m.open; })[0];
    if (!open) return;
    open.open = false;
    open.querySelector('summary').focus();
  });
})();
