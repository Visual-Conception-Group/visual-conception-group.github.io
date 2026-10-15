/* Home page word cloud. The words and their counts come from _includes/word-cloud.html;
   this script packs them into a cloud: biggest word first, in the middle, then each next
   word on an elliptical spiral until it finds a free spot. The layout has no randomness,
   so it looks the same on every visit and only changes when the papers do. */
(function () {
  var box = document.getElementById('word-cloud');
  if (!box) return;
  var words = Array.prototype.slice.call(box.querySelectorAll('.cloud-word'));
  if (!words.length) return;

  var MIN_PX = 13, PAD = 4;

  function layout() {
    box.classList.add('is-cloud');   // switch to the fixed-size cloud box before measuring it
    var W = box.clientWidth, H = box.clientHeight;
    if (!W || !H) return;

    // Size by the square root of the count, so one very common word doesn't dwarf the rest.
    var counts = words.map(function (w) { return +w.getAttribute('data-count') || 1; });
    var hi = Math.sqrt(Math.max.apply(null, counts)), lo = Math.sqrt(Math.min.apply(null, counts));
    var maxPx = Math.max(24, Math.min(60, W / 8.5));

    for (var attempt = 0; attempt < 6; attempt++) {
      var placed = [], fitted = 0;
      words.forEach(function (el, i) {
        var t = hi === lo ? 1 : (Math.sqrt(counts[i]) - lo) / (hi - lo);
        el.style.fontSize = (MIN_PX + (maxPx - MIN_PX) * t).toFixed(1) + 'px';
        el.hidden = false;   // a word left out last time must be measured again at its real size
      });
      // Measure after sizing (one read pass, then one write pass).
      var sizes = words.map(function (el) { return { w: el.offsetWidth + PAD, h: el.offsetHeight + PAD }; });
      var widest = Math.max.apply(null, sizes.map(function (s) { return s.w; }));
      if (widest > W * 0.94) { maxPx *= (W * 0.94) / widest; continue; }

      words.forEach(function (el, i) {
        var s = sizes[i], spot = findSpot(s.w, s.h, W, H, placed);
        if (spot) {
          placed.push(spot);
          el.style.transform = 'translate(' + (spot.x + PAD / 2).toFixed(1) + 'px,' + (spot.y + PAD / 2).toFixed(1) + 'px)';
          el.hidden = false;
          fitted++;
        } else {
          el.hidden = true;
        }
      });
      // If too many words were left out, shrink everything a little and try again.
      if (fitted >= words.length * 0.9 || maxPx <= MIN_PX + 4) break;
      maxPx *= 0.88;
    }
  }

  function findSpot(w, h, W, H, placed) {
    var cx = W / 2, cy = H / 2, ratio = W / H;
    for (var t = 0; t < 900; t += 0.35) {
      var r = 2.2 * t;
      var x = cx + r * Math.cos(t) * Math.sqrt(ratio) - w / 2;
      var y = cy + r * Math.sin(t) / Math.sqrt(ratio) - h / 2;
      if (x < 0 || y < 0 || x + w > W || y + h > H) {
        if (r > Math.max(W, H)) return null;
        continue;
      }
      var hit = false;
      for (var i = 0; i < placed.length; i++) {
        var p = placed[i];
        if (x < p.x + p.w && x + w > p.x && y < p.y + p.h && y + h > p.y) { hit = true; break; }
      }
      if (!hit) return { x: x, y: y, w: w, h: h };
    }
    return null;
  }

  var pending;
  function schedule() { cancelAnimationFrame(pending); pending = requestAnimationFrame(layout); }
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(box);
  else window.addEventListener('resize', schedule);
  // Re-run once the display font has loaded, since word widths depend on it.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  schedule();
})();
