(function(doc, win) {
    let docEl = doc.documentElement;
    let resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
    let recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) {
          return;
        }
        if (clientWidth >= 750) {
          docEl.style.fontSize = "200px";
        } else {
          docEl.style.fontSize = 200 * (clientWidth / 750) + "px";
        }
      };
    if (!doc.addEventListener) {
      return;
    }
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);
  })(document, window);
