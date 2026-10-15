/* Publications page: search and filter. The full list is in the HTML, so the page
   works without JavaScript; this only hides what doesn't match.
   By default only published papers (journal and conference) are shown; the
   "Preprints" chip shows preprints instead.
   Filters are kept in the URL (?q=…&type=…&topic=…) so a filtered view can be shared.
   ?word=a,b,c (used by the home page word cloud) keeps papers whose TITLE contains one of
   those words, split the same way as _includes/word-cloud.html. */
(function () {
  var form = document.querySelector('.pub-filters');
  if (!form) return;
  var search = document.getElementById('pub-search');
  var pubs = Array.prototype.slice.call(document.querySelectorAll('.pub-years .pub'));
  var groups = Array.prototype.slice.call(document.querySelectorAll('.pub-year-group'));
  var count = document.getElementById('pub-count');
  var empty = document.getElementById('pub-empty');
  var wordClear = document.getElementById('pub-word-clear');
  var titleWords = pubs.map(function (p) {
    var t = (p.querySelector('.pub-title') || p).textContent.toLowerCase().replace(/[:,()?#."']/g, ' ');
    return t.split(/\s+/).filter(Boolean);
  });
  var params0 = new URLSearchParams(location.search);
  var word = (params0.get('word') || '').toLowerCase().split(',').map(function (w) { return w.trim(); }).filter(Boolean);
  var publishedTotal = pubs.filter(function (p) { return p.getAttribute('data-type') !== 'preprint'; }).length;

  function checked(name) {
    var el = form.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : '';
  }
  // Compares values directly (no CSS selector), so odd characters in the URL can't break anything.
  function setRadio(name, value) {
    var radios = form.querySelectorAll('input[type="radio"][name="' + name + '"]');
    Array.prototype.forEach.call(radios, function (r) { if (r.value === value) r.checked = true; });
  }
  function topicTitle(id) {
    var el = form.querySelector('input[name="topic"][value="' + id + '"]');
    return el ? el.getAttribute('data-title') : id;
  }

  function apply() {
    var terms = search.value.toLowerCase().split(/\s+/).filter(Boolean);
    var type = checked('type'), topic = checked('topic');
    var shown = 0;
    pubs.forEach(function (p, idx) {
      var ptype = p.getAttribute('data-type');
      var ok = (type ? ptype === type : ptype !== 'preprint') &&
        (!topic || (' ' + p.getAttribute('data-topics') + ' ').indexOf(' ' + topic + ' ') !== -1);
      if (ok && word.length) {
        ok = word.some(function (w) { return titleWords[idx].indexOf(w) !== -1; });
      }
      if (ok && terms.length) {
        var hay = p.getAttribute('data-search');
        ok = terms.every(function (t) { return hay.indexOf(t) !== -1; });
      }
      p.hidden = !ok;
      if (ok) shown++;
    });
    groups.forEach(function (g) { g.hidden = !g.querySelector('.pub:not([hidden])'); });
    empty.hidden = shown !== 0;

    var label = { journal: 'journal articles', conference: 'conference papers', preprint: 'preprints' }[type] || 'published papers';
    wordClear.hidden = !word.length;
    if (word.length) {
      count.textContent = 'Showing ' + shown + ' ' + (shown === 1 ? label.replace(/s$/, '') : label) +
        ' with \u201c' + word[0] + '\u201d in the title' + (topic ? ' on ' + topicTitle(topic) : '') +
        (terms.length ? ' matching "' + search.value.trim() + '"' : '');
    } else if (!terms.length && !topic) {
      count.textContent = type ? 'Showing ' + shown + ' ' + (shown === 1 ? label.replace(/s$/, '') : label)
        : 'Showing all ' + publishedTotal + ' published papers';
    } else {
      count.textContent = 'Showing ' + shown + ' ' + (shown === 1 ? label.replace(/s$/, '') : label) +
        (topic ? ' on ' + topicTitle(topic) : '') + (terms.length ? ' matching "' + search.value.trim() + '"' : '');
    }

    // Keep any other parameters (e.g. utm_source) and only rewrite the ones this page owns.
    var params = new URLSearchParams(location.search);
    ['q', 'type', 'topic', 'word'].forEach(function (k) { params.delete(k); });
    if (word.length) params.set('word', word.join(','));
    if (search.value.trim()) params.set('q', search.value.trim());
    if (type) params.set('type', type);
    if (topic) params.set('topic', topic);
    var qs = params.toString();
    var next = location.pathname + (qs ? '?' + qs : '') + location.hash;
    if (next !== location.pathname + location.search + location.hash) history.replaceState(null, '', next);
  }

  var initial = new URLSearchParams(location.search);
  if (initial.get('q')) search.value = initial.get('q');
  if (initial.get('type')) setRadio('type', initial.get('type'));
  if (initial.get('topic')) setRadio('topic', initial.get('topic'));


  form.addEventListener('input', apply);
  form.addEventListener('change', apply);
  document.getElementById('pub-reset').addEventListener('click', function () {
    search.value = ''; setRadio('type', ''); setRadio('topic', ''); word = []; apply(); search.focus();
  });
  wordClear.addEventListener('click', function () { word = []; apply(); search.focus(); });
  apply();
})();
