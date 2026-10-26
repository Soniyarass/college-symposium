/* ==========================================================================
   ROBOT3D & SOUND SYNTHESIS ENGINE
   Handles:
   - Interactive 3D Cartoon Robot Mascot motion & expressions
   - Canvas particle galaxy & cyber grid effects
   - Web Audio API futuristic sound FX
   ========================================================================== */

// --- 1. Synthesized Web Audio FX (Zero External Audio Dependencies) ---
class CyberSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBeep(freq = 600, duration = 0.08, type = 'sine') {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy catch
    }
  }

  playRobotChirp() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, t);
      osc.frequency.exponentialRampToValueAtTime(950, t + 0.12);
      osc.frequency.exponentialRampToValueAtTime(1400, t + 0.22);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(t + 0.24);
    } catch (e) {}
  }

  playSuccessChime() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C - E - G - High C
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + idx * 0.08;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, t);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.35);
      });
    } catch (e) {}
  }
}

window.cyberSound = new CyberSoundEngine();

// --- 2. Interactive Animated 3D Cartoon Robot Mascot Controller ---
class RobotMascotController {
  constructor() {
    this.stage = document.getElementById('robot-stage');
    this.mascot = document.getElementById('robot-mascot');
    this.head = document.getElementById('robot-head');
    this.eyes = document.querySelectorAll('.robot-eye');
    this.mouth = document.getElementById('robot-mouth');
    this.bubble = document.getElementById('mascot-bubble-text');
    this.core = document.getElementById('robot-reactor-core');
    
    this.dialogueList = [
      "Beep boop! 🤖 I'm <strong>CYBER-NEX</strong>, your symposium mascot!",
      "Are you ready for the ₹50,000+ prize pool? 🏆",
      "Check out <strong>Solo Dance</strong> and <strong>Music</strong> in the events below!",
      "Gear up for <strong>Treasure Hunt</strong>! Clues are AI encrypted 🔐",
      "Click my mini-bot in the bottom corner to ask questions anytime!",
      "Speed coders: Test your reflexes in <strong>Code Blitz</strong>! 💻",
      "Register today and get an instant digital hologram pass!"
    ];
    this.dialogueIndex = 0;
    this.isHappy = false;

    this.init();
  }

  init() {
    if (!this.stage || !this.mascot) return;

    // Mouse tracking for 3D Parallax Tilt
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));

    // Stage Click Interaction (Happy Dance & Voice)
    this.stage.addEventListener('click', () => this.triggerHappyReaction());

    // Speech bubble click to cycle dialogues
    const bubbleWrapper = document.getElementById('mascot-speech-bubble');
    if (bubbleWrapper) {
      bubbleWrapper.addEventListener('click', () => this.nextDialogue());
    }

    // Auto cycle dialogue every 9 seconds
    setInterval(() => {
      this.nextDialogue(false);
    }, 9000);

    // Mascot control buttons
    const btnWave = document.getElementById('btn-mascot-wave');
    const btnDance = document.getElementById('btn-mascot-dance');
    const btnSpeak = document.getElementById('btn-mascot-speak');

    if (btnWave) {
      btnWave.addEventListener('click', (e) => {
        e.stopPropagation();
        this.waveHand();
      });
    }

    if (btnDance) {
      btnDance.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dance();
      });
    }

    if (btnSpeak) {
      btnSpeak.addEventListener('click', (e) => {
        e.stopPropagation();
        this.speak();
      });
    }

    // Reactor Core Glow Click
    if (this.core) {
      this.core.addEventListener('click', (e) => {
        e.stopPropagation();
        this.superCharge();
      });
    }
  }

  handleMouseMove(e) {
    if (this.isHappy) return;

    const rect = this.stage.getBoundingClientRect();
    const stageCenterX = rect.left + rect.width / 2;
    const stageCenterY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - stageCenterX) / (window.innerWidth / 2);
    const deltaY = (e.clientY - stageCenterY) / (window.innerHeight / 2);

    // 3D rotation limits
    const rotY = Math.max(-25, Math.min(25, deltaX * 30));
    const rotX = Math.max(-20, Math.min(20, -deltaY * 25));

    // Mascot tilt
    this.mascot.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;

    // Head slight extra parallax
    if (this.head) {
      this.head.style.transform = `translateX(${deltaX * 12}px) translateY(${deltaY * 8}px)`;
    }

    // Digital Pupil Gaze
    this.eyes.forEach(eye => {
      const eyeShiftX = Math.max(-5, Math.min(5, deltaX * 7));
      const eyeShiftY = Math.max(-4, Math.min(4, deltaY * 6));
      eye.style.transform = `translate(${eyeShiftX}px, ${eyeShiftY}px)`;
    });
  }

  nextDialogue(playSnd = true) {
    this.dialogueIndex = (this.dialogueIndex + 1) % this.dialogueList.length;
    if (this.bubble) {
      this.bubble.style.opacity = '0';
      setTimeout(() => {
        this.bubble.innerHTML = this.dialogueList[this.dialogueIndex];
        this.bubble.style.opacity = '1';
        if (playSnd) window.cyberSound.playRobotChirp();
      }, 180);
    }
  }

  triggerHappyReaction() {
    window.cyberSound.playRobotChirp();
    this.isHappy = true;

    // Heart eyes / happy expression
    this.eyes.forEach(eye => {
      eye.style.height = '14px';
      eye.style.borderRadius = '50% 50% 10px 10px';
      eye.style.background = '#f43f5e';
      eye.style.boxShadow = '0 0 20px #f43f5e';
    });

    if (this.mouth) {
      this.mouth.style.width = '32px';
      this.mouth.style.height = '14px';
      this.mouth.style.borderColor = '#f43f5e';
    }

    // Happy 360 Spin Jump
    this.mascot.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    this.mascot.style.transform = 'translateY(-35px) rotateY(360deg) scale(1.1)';

    if (this.bubble) {
      this.bubble.innerHTML = "Yay! Let's win some prizes! 🎉";
    }

    setTimeout(() => {
      this.mascot.style.transition = 'transform 0.2s ease-out';
      this.eyes.forEach(eye => {
        eye.style.height = '28px';
        eye.style.borderRadius = '14px';
        eye.style.background = 'var(--primary-blue)';
        eye.style.boxShadow = '0 0 16px var(--primary-blue), 0 0 30px rgba(0, 240, 255, 0.8)';
      });
      if (this.mouth) {
        this.mouth.style.width = '22px';
        this.mouth.style.height = '8px';
        this.mouth.style.borderColor = '#00f0ff';
      }
      this.isHappy = false;
    }, 1000);
  }

  waveHand() {
    window.cyberSound.playBeep(880, 0.12);
    const rightArm = document.querySelector('.robot-arm.right');
    if (rightArm) {
      rightArm.style.animation = 'none';
      rightArm.offsetHeight; /* trigger reflow */
      rightArm.style.animation = 'wavingHand 0.4s ease-in-out 4';
      setTimeout(() => {
        rightArm.style.animation = 'wavingHand 2s ease-in-out infinite';
      }, 1600);
    }
    if (this.bubble) {
      this.bubble.innerHTML = "Hello innovator! Welcome aboard! 👋";
    }
  }

  dance() {
    this.triggerHappyReaction();
  }

  speak() {
    this.nextDialogue(true);
  }

  superCharge() {
    window.cyberSound.playSuccessChime();
    const corePulse = document.querySelector('.core-pulse');
    if (corePulse) {
      corePulse.style.boxShadow = '0 0 50px #00f0ff, 0 0 80px #a855f7';
      setTimeout(() => {
        corePulse.style.boxShadow = '0 0 18px #00f0ff, 0 0 30px #a855f7';
      }, 1500);
    }
    if (this.bubble) {
      this.bubble.innerHTML = "⚡ Reactor Overcharged! AI Systems at 100%! ⚡";
    }
  }
}

// --- 3. Cyber Starfield & Particle Constellation Engine (Canvas) ---
function initCyberBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(85, Math.floor(width / 16));
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.8,
      color: Math.random() > 0.5 ? '#00f0ff' : '#a855f7',
      alpha: Math.random() * 0.7 + 0.2
    });
  }

  let mouseX = -1000;
  let mouseY = -1000;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Subtle Digital Grid Line Effect in background
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.03)';
    ctx.lineWidth = 1;
    const gridSize = 60;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Connect close particles with glowing electric lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.18 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      // Proximity link to mouse
      const mdx = particles[i].x - mouseX;
      const mdy = particles[i].y - mouseY;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 140) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(168, 85, 247, ${0.35 * (1 - mdist / 140)})`;
        ctx.lineWidth = 1.2;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
      }
    }

    // Draw Particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }

    requestAnimationFrame(render);
  }

  render();
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initCyberBackground();
  window.mascotCtrl = new RobotMascotController();
});
