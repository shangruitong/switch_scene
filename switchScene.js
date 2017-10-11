var switchScene = (function() {
  var switcheffect = {};
  switcheffect['slideup'] = function($currentPage, $nextPage, finishCallback) {
    animate(0, 100, 0.5, function(para) {
      $currentPage.css({
        'transform': 'translate(0,' + (-para) + '%)',
        '-webkit-transform': 'translate(0,' + (-para) + '%)',
        'opacity': 1
      });
      $nextPage.css({
        'transform': 'translate(0,' + (100 - para) + '%)',
        '-webkit-transform': 'translate(0,' + (100 - para) + '%)',
        'opacity': 1
      });
    }, finishCallback);
  };
  switcheffect['slidedown'] = function($currentPage, $nextPage, finishCallback) {
    animate(0, 100, 0.5, function(para) {
      $currentPage.css({
        'transform': 'translate(0,' + para + '%)',
        '-webkit-transform': 'translate(0,' + para + '%)',
        'opacity': 1
      });
      $nextPage.css({
        'transform': 'translate(0,' + (para - 100) + '%)',
        '-webkit-transform': 'translate(0,' + (para - 100) + '%)',
        'opacity': 1
      });
    }, finishCallback);
  };
  switcheffect['fade'] = function($currentPage, $nextPage, finishCallback) {
    animate(0, 1, 0.3, function(para) {
      $currentPage.css({
        'transform': 'translate(0,0)',
        '-webkit-transform': 'translate(0,0)',
        'opacity': 1 - para
      });
      $nextPage.css({
        'transform': 'translate(0,0)',
        '-webkit-transform': 'translate(0,0)',
        'opacity': para
      });
    }, finishCallback);
  };

  function animate(from, to, second, updateCallback, finshCallback) {
    var times = second * 60; // 按照raf每秒执行50次计算次数，实际动画事件时与raf有关
    var cTime = 0;
    var para = from;

    run();

    function run() {
      cTime++;
      para = cTime / times * (to - from) + from;
      updateCallback(para);
      if (para === to) {
        finshCallback();
      } else {
        setTimeout(run, 15);
        // requestAnimationFrame(run);
      }
    }
  }

  function switchScene($currentPage, $nextPage, effect, finishCallback) {
    prepare($currentPage, $nextPage)
    if (switcheffect[effect]) {
      switcheffect[effect]($currentPage, $nextPage, function() {
        afterAnimation($currentPage);
        finishCallback();
      });
    } else {
      switcheffect['fade']($currentPage, $nextPage, function() {
        afterAnimation($currentPage);
        finishCallback();
      });
    }
  }

  function prepare($currentPage, $nextPage) {
    $nextPage.css({
      'z-index': 1,
      'visibility': 'visible'
    });
    $currentPage.css({
      'z-index': 0
    });
  }

  function afterAnimation($currentPage) {
    $currentPage.css({
      'z-index': -1,
      'visibility': 'hidden'
    });
  }

  return {
    switch: switchScene
  }
})();
