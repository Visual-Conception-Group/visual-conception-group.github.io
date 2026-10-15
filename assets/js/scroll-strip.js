/* Rows that scroll sideways on desktop (home page: Recent publications and People).
   Each row has data-scroll-strip and an id; its buttons come from _includes/strip-nav.html.
   The buttons are shown only when the row is wider than the screen, and a button is greyed
   out at the end of the row. Without JavaScript the rows still scroll. */
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('[data-scroll-strip]'), function (strip) {
    var nav = document.querySelector('.strip-nav[data-for="' + strip.id + '"]');
    if (!nav) return;
    var prev = nav.querySelector('[data-dir="-1"]'), next = nav.querySelector('[data-dir="1"]');
    var label = (nav.querySelector('[data-dir="1"]').getAttribute('aria-label') || '').replace(/^Scroll | right$/g, '');

    function update() {
      // On phones the CSS turns the row back into a grid; then nothing overflows and the buttons hide.
      var overflow = strip.scrollWidth - strip.clientWidth > 2;
      nav.hidden = !overflow;
      if (overflow) { strip.setAttribute('tabindex', '0'); strip.setAttribute('aria-label', label + ', scrolls sideways'); }
      else { strip.removeAttribute('tabindex'); strip.removeAttribute('aria-label'); }
      prev.disabled = strip.scrollLeft <= 2;
      next.disabled = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 2;
    }
    [prev, next].forEach(function (btn) {
      btn.addEventListener('click', function () {
        var step = Math.max(strip.clientWidth * 0.8, 180) * (+btn.getAttribute('data-dir'));
        strip.scrollBy({ left: step, behavior: 'smooth' });
        setTimeout(update, 450);   // in case the browser sends no scroll events
      });
    });
    strip.addEventListener('scroll', update, { passive: true });
    strip.addEventListener('scrollend', update);
    if ('ResizeObserver' in window) new ResizeObserver(update).observe(strip);
    else window.addEventListener('resize', update);
    update();
  });
})();
