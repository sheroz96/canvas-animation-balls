var width, height, target, canvas, ctx, circles;
particleInit();
particleAddListeners();

function particleAddListeners() {
  window.addEventListener('resize', particleResize);
}

function particleInit() {
  width = window.innerWidth;
  height = window.innerHeight;
  target = {
    x: 0,
    y: height
  };
  canvas = document.getElementById('particle');
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext('2d');

  circles = [];
  for( var x = 0; x < width*0.25; x++ ) {
    var c = new particleCircle();
    circles.push(c);
  }
  particleAnimate();
}

function particleResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function particleAnimate() {
  ctx.clearRect(0, 0, width, height);
  for( var i in circles ) {
    circles[i].draw();
  }
  requestAnimationFrame(particleAnimate);
}

function particleCircle() {
  var _this = this;

  (function() {
    _this.pos = {};
    init();
  })();

  function init() {
    _this.pos.x = Math.random() * width;
    _this.pos.y = height + Math.random() * 100;
    _this.alpha = 0.2 + Math.random() * 0.4;
    _this.scale = 0.4 + Math.random();
    _this.velocity = Math.random() * 1.6;
  }

  _this.draw = function() {
    if ( _this.alpha <= 0 ) {
      init();
    }
    _this.pos.y -= _this.velocity;
    _this.alpha -= 0.0005;
    ctx.beginPath();
    ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 5 * Math.PI, false);
    ctx.fillStyle = 'rgba(10,1,10,' +  _this.alpha + ')';
    ctx.fill();
  };
}