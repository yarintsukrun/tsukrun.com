/**
 * Main JavaScript file for the portfolio.
 * We wrap everything in DOMContentLoaded to ensure the elements
 * exist before we try to manipulate them.
 */
document.addEventListener('DOMContentLoaded', () => {

  // === 1. Particles Background ===
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
      W = canvas.width = innerWidth;
      H = canvas.height = innerHeight;
    }
    window.addEventListener('resize', resize);
    resize(); // Initial size

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    class P {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = rand(0, W);
        this.y = rand(0, H);
        this.r = rand(0.6, 2.6);
        this.vx = rand(-0.3, 0.3);
        this.vy = rand(-0.2, 0.2);
        this.alpha = rand(0.08, 0.45);
      }
      move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -10) this.x = W + 10;
        if (this.x > W + 10) this.x = -10;
        if (this.y < -10) this.y = H + 10;
        if (this.y > H + 10) this.y = -10;
      }
      draw() {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(230,138,255,' + this.alpha + ')'; // Purple shade
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 140; i++) {
      particles.push(new P());
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      for (let p of particles) {
        p.move();
        p.draw();
      }
      requestAnimationFrame(loop);
    }
    loop();
  } // end if(canvas)

  
  // === 2. Reveal on Scroll ===
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(r => io.observe(r));
  }
  
  // === 3. Typed Effect ===
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    const words = ['Computer Science', 'Machine Learning', 'Automation', 'AI', 'Problem Solver'];
    let ti = 0, ci = 0, dir = 1;

    function tick() {
      const w = words[ti];
      ci += (dir ? 1 : -1);
      typedEl.textContent = w.slice(0, ci);
      
      if (ci === w.length) { // Word finished typing
        dir = 0;
        setTimeout(tick, 900);
      } else if (ci === 0 && dir === 0) { // Word finished deleting
        dir = 1;
        ti = (ti + 1) % words.length;
        setTimeout(tick, 300);
      } else { // Mid-typing or mid-deleting
        setTimeout(tick, 70);
      }
    }
    tick();
  } // end if(typedEl)

  
  // === 4. Skill Bars Animation ===
  const skillBars = document.querySelectorAll('.skillbar');
  if (skillBars.length > 0) {
    const barIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const i = e.target.querySelector('i');
          if (i) {
            i.style.width = i.getAttribute('data-width');
          }
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => barIO.observe(bar)); // Observe the .skillbar parent
  }

  
  // === 5. Theme Toggle ===
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const root = document.documentElement;
      if (root.style.getPropertyValue('--bg') === '#fff') { // light -> dark
        root.style.setProperty('--bg', '#05060a');
        root.style.setProperty('--muted', '#9aa4b2');
      } else { // dark -> light
        root.style.setProperty('--bg', '#ffffff');
        root.style.setProperty('--muted', '#556');
      }
    });
  }

  
  // === 6. Subtle Avatar Hover Effect ===
  const avatar = document.getElementById('avatar');
  if (avatar) {
    avatar.addEventListener('mousemove', (e) => {
      const r = avatar.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width * 30 - 15;
      const y = (e.clientY - r.top) / r.height * 30 - 15;
      avatar.style.transform = `perspective(500px) rotateY(${x/2}deg) rotateX(${-y/2}deg)`;
    });
    avatar.addEventListener('mouseleave', () => {
      avatar.style.transform = 'perspective(500px) rotateY(0deg) rotateX(0deg)';
    });
  }

  
  // === 7. Trigger Reveal for Showcase Image (immediately) ===
  const pcShowcase = document.querySelector('.pc-showcase');
  if (pcShowcase && !pcShowcase.classList.contains('show')) {
    setTimeout(() => {
      pcShowcase.classList.add('show');
    }, 100); // Slight delay to ensure paint
  }

}); // End DOMContentLoaded