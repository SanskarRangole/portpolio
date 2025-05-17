const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let mouseX = 0, mouseY = 0;
let particles = [];

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Add particle on mouse move
  particles.push({
    x: mouseX,
    y: mouseY,
    size: Math.random() * 4 + 1,
    life: 100,
  });
});

function drawParticles() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((p, i) => {
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, 255, 213, ${p.life / 100})`;
    ctx.shadowColor = 'rgba(0,255,213,0.7)';
    ctx.shadowBlur = 10;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    p.life -= 2;
    p.size *= 0.95;
    if (p.life <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();
const bgCanvas = document.getElementById('particles-background');
const bgCtx = bgCanvas.getContext('2d');
let bgWidth, bgHeight;
let bgParticles = [];

function bgResize() {
  bgWidth = window.innerWidth;
  bgHeight = window.innerHeight;
  bgCanvas.width = bgWidth;
  bgCanvas.height = bgHeight;
}
bgResize();
window.addEventListener('resize', bgResize);

function createBgParticles() {
  for (let i = 0; i < 100; i++) {
    bgParticles.push({
      x: Math.random() * bgWidth,
      y: Math.random() * bgHeight,
      size: Math.random() * 2 + 1,
      speedY: 0.3 + Math.random() * 0.7,
      opacity: Math.random() * 0.5 + 0.3
    });
  }
}
createBgParticles();

function animateBgParticles() {
  bgCtx.clearRect(0, 0, bgWidth, bgHeight);
  bgParticles.forEach(p => {
    p.y -= p.speedY;
    if (p.y < 0) p.y = bgHeight;
    bgCtx.beginPath();
    bgCtx.fillStyle = `rgba(0, 255, 213, ${p.opacity})`;
    bgCtx.shadowColor = 'rgba(0,255,213,0.7)';
    bgCtx.shadowBlur = 5;
    bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    bgCtx.fill();
  });
  requestAnimationFrame(animateBgParticles);
}
animateBgParticles();
