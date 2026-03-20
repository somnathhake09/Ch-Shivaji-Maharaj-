(function () {
  'use strict';

  
  var loader = document.getElementById('loader');
  var ldProg = document.getElementById('ldProg');
  var pct = 0;
  var lt = setInterval(function () {
    pct += Math.random() * 18 + 7;
    if (pct >= 100) {
      pct = 100;
      clearInterval(lt);
      setTimeout(function () { loader.classList.add('done'); }, 350);
    }
    ldProg.style.width = Math.min(pct, 100) + '%';
  }, 90);

  // ── LANGUAGE TOGGLE ──
  var ltMr = document.getElementById('ltMr');
  var ltEn = document.getElementById('ltEn');

  if (ltMr && ltEn) {
    function setLang(lang) {
      if (lang === 'en') {
        document.body.classList.add('english');
        ltMr.classList.remove('active');
        ltEn.classList.add('active');
      } else {
        document.body.classList.remove('english');
        ltMr.classList.add('active');
        ltEn.classList.remove('active');
      }
    }
    ltMr.addEventListener('click', function () { setLang('mr'); });
    ltEn.addEventListener('click', function () { setLang('en'); });
  }



  

  
  var nav = document.getElementById('nav');
  var sttBtn = document.getElementById('stt');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('stuck', window.scrollY > 55);
    sttBtn.classList.toggle('show', window.scrollY > 380);
  }, { passive: true });

  
  var ham = document.getElementById('ham');
  var navLinks = document.getElementById('navLinks');
  ham.addEventListener('click', function () {
    ham.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nl').forEach(function (l) {
    l.addEventListener('click', function () {
      ham.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 66, behavior: 'smooth' });
      }
    });
  });

  
  sttBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  
  var sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    var y = window.scrollY + 90;
    sections.forEach(function (sec) {
      var link = document.querySelector('.nl[href="#' + sec.id + '"]');
      if (link) link.classList.toggle('on', y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight);
    });
  }, { passive: true });

  
  var revObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -25px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { revObs.observe(el); });

  
  var tlObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); tlObs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.tl-item').forEach(function (el) { tlObs.observe(el); });

  
  var cvs = document.getElementById('heroCanvas');
  var ctx = cvs.getContext('2d');
  var W, H, pts = [], raf;

  function resizeCvs() { W = cvs.width = cvs.offsetWidth; H = cvs.height = cvs.offsetHeight; }
  window.addEventListener('resize', resizeCvs, { passive: true });
  resizeCvs();

  var COLS = ['rgba(200,145,12,', 'rgba(255,122,0,', 'rgba(240,190,55,', 'rgba(255,160,50,'];

  function Pt() { this.reset(); this.y = Math.random() * H; }
  Pt.prototype.reset = function () {
    this.x = Math.random() * W;
    this.y = H + Math.random() * 60;
    this.sz = Math.random() * 2.2 + 0.6;
    this.vy = -(Math.random() * 0.52 + 0.2);
    this.vx = (Math.random() - 0.5) * 0.32;
    this.a = 0; this.maxA = Math.random() * 0.48 + 0.1;
    this.in_ = true;
    this.col = COLS[Math.floor(Math.random() * COLS.length)];
    this.ph = Math.random() * Math.PI * 2;
    this.dia = Math.random() > 0.8;
  };
  Pt.prototype.step = function () {
    this.x += this.vx + Math.sin(this.ph) * 0.13; this.y += this.vy; this.ph += 0.036;
    if (this.in_) { this.a += 0.009; if (this.a >= this.maxA) this.in_ = false; }
    else { this.a -= 0.005; }
    if (this.a <= 0 || this.y < -20) this.reset();
  };
  Pt.prototype.draw = function () {
    var a = Math.max(0, this.a);
    ctx.globalAlpha = a; ctx.fillStyle = this.col + a + ')';
    if (this.dia) {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(Math.PI / 4);
      var s = this.sz * 1.3; ctx.fillRect(-s, -s, s * 2, s * 2); ctx.restore();
    } else {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2); ctx.fill();
    }
  };
  for (var i = 0; i < 60; i++) pts.push(new Pt());

  function animLoop() {
    ctx.clearRect(0, 0, W, H); ctx.globalAlpha = 1;
    pts.forEach(function (p) { p.step(); p.draw(); });
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(animLoop);
  }
  new IntersectionObserver(function (e) {
    if (e[0].isIntersecting) { if (!raf) animLoop(); }
    else { cancelAnimationFrame(raf); raf = null; }
  }, { threshold: 0.02 }).observe(document.getElementById('hero'));

  
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');

  document.querySelectorAll('.gal-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      lbImg.src = img.src;
      lbCap.textContent = item.getAttribute('data-cap-mr') || '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; lbImg.src = ''; }
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbBg').addEventListener('click', closeLb);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  
  var slides = document.querySelectorAll('.q-slide');
  var qDots = document.getElementById('qDots');
  var cur = 0, qtimer;

  slides.forEach(function (_, i) {
    var d = document.createElement('div');
    d.className = 'qdot' + (i === 0 ? ' on' : '');
    d.addEventListener('click', function () { goQ(i); resetQ(); });
    qDots.appendChild(d);
  });

  function goQ(n) {
    slides[cur].classList.remove('active');
    qDots.children[cur].classList.remove('on');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    qDots.children[cur].classList.add('on');
  }
  function resetQ() { clearInterval(qtimer); qtimer = setInterval(function () { goQ(cur + 1); }, 5500); }
  document.getElementById('qPrev').addEventListener('click', function () { goQ(cur - 1); resetQ(); });
  document.getElementById('qNext').addEventListener('click', function () { goQ(cur + 1); resetQ(); });
  resetQ();

  
  document.querySelectorAll('.fort-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'translateY(-9px) rotateX(' + (-y * 5) + 'deg) rotateY(' + (x * 5) + 'deg)';
    });
    card.addEventListener('mouseleave', function () { card.style.transform = ''; });
  });

  
})();