
(function () {
  'use strict';

  console.log('Shelf map script loaded');

  var mapURL =
    'https://libguides.hofstra.edu/ld.php?content_id=59791517';

  function updateLinks() {
    document.querySelectorAll('a.shelfmap').forEach(function (link) {
      var row = link.closest('tr');
      if (!row) return;

      var cell = row.querySelector(
        '[data-testid$="callNumberWithCopy"]'
      );
      if (!cell) return;

      var callNumber = cell.textContent.trim();
      var match = callNumber.match(/^([A-Z]{1,3})\s*\d/i);
      if (!match) return;

      var firstLetter = match[1].toUpperCase().charAt(0);

      if (firstLetter >= 'A' && firstLetter <= 'E') {
        if (link.getAttribute('href') !== mapURL) {
          link.setAttribute('href', mapURL);
          console.log('Shelf map updated:', callNumber);
        }
      }
    });
  }

  function start() {
    updateLinks();

    new MutationObserver(updateLinks).observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
