javascript
(function () {
  var DEFAULT_MAP = 'https://yourlibrary.libguides.com/ez/stacks-default.png';

  // Edit these: LC class letters, number range, map image URL (from Springshare)
  var RANGES = [
    { cls: 'Q',  from: 1,    to: 999,  map: 'https://.../stacks-q.png' },
    { cls: 'PQ', from: 1,    to: 3999, map: 'https://.../stacks-pq-a.png' },
    { cls: 'PQ', from: 4000, to: 9999, map: 'https://.../stacks-pq-b.png' },
    { cls: 'PR', from: 1,    to: 9999, map: 'https://.../stacks-pr.png' }
  ];

  function parse(t) {
    var m = t.match(/^\s*([A-Z]{1,3})\s*(\d+(?:\.\d+)?)/i);
    return m ? { cls: m[1].toUpperCase(), num: parseFloat(m[2]) } : null;
  }

  function mapFor(cn) {
    for (var i = 0; i < RANGES.length; i++) {
      var r = RANGES[i];
      if (r.cls === cn.cls && cn.num >= r.from && cn.num <= r.to) return r.map;
    }
    return DEFAULT_MAP;
  }

  function update() {
    document.querySelectorAll('a.shelfmap:not([data-done])').forEach(function (a) {
      var sel = '[data-testid$="callNumberWithCopy"]';
      var row = a.closest('tr');
      var cell = (row && row.querySelector(sel)) || document.querySelector(sel);
      if (!cell) return;
      var cn = parse(cell.innerText || '');
      if (!cn) return;
      a.href = mapFor(cn);
      a.dataset.done = '1';
    });
  }

  new MutationObserver(update).observe(document.body, { childList: true, subtree: true });
  update();
})();
