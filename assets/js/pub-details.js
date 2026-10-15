/* Abstract and BibTeX panels under each publication, plus a Copy button for BibTeX.
   The buttons are hidden in the HTML and only shown here, so visitors without
   JavaScript never see buttons that do nothing. */
(function () {
  var toggles = document.querySelectorAll('.pub-toggle');
  Array.prototype.forEach.call(toggles, function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.hidden = false;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      // One panel per paper at a time, like a tab: close the sibling first.
      var pub = btn.closest('.pub');
      Array.prototype.forEach.call(pub.querySelectorAll('.pub-toggle'), function (other) {
        if (other === btn) return;
        other.setAttribute('aria-expanded', 'false');
        var p = document.getElementById(other.getAttribute('aria-controls'));
        if (p) p.hidden = true;
      });
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      panel.hidden = open;
    });
  });

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.copy-bibtex');
    if (!btn) return;
    var code = btn.parentNode.querySelector('code');
    var text = code.textContent;
    function done(ok) {
      btn.textContent = ok ? 'Copied' : 'Select and copy';
      setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { selectText(code); done(false); });
    } else {
      selectText(code); done(false);
    }
  });

  function selectText(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
})();
