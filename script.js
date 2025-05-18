const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let fireworks = [];

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.color = color;
    this.speed = Math.random() * 5 + 2;
    this.angle = Math.random() * 2 * Math.PI;
    this.alpha = 1;
    this.gravity = 0.05;
    this.friction = 0.98;
  }

  update() {
    this.speed *= this.friction;
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle) + this.gravity;
    this.alpha -= 0.015;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
  for (let i = 0; i < 50; i++) {
    fireworks.push(new Particle(x, y, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.alpha <= 0) fireworks.splice(index, 1);
  });

  if (Math.random() < 0.05) createFirework();
}
animate();

document.getElementById("playButton").addEventListener("click", () => {
  const music = document.getElementById("birthdaySong");
  music.volume = 1.0;
  music.play();
  document.getElementById("playButton").style.display = "none";
});
const playButton = document.getElementById("playButton");
const song = document.getElementById("birthdaySong");

playButton.addEventListener("click", () => {
  song.volume = 1.0;
  song.play().then(() => {
    playButton.style.display = "none";
  }).catch((error) => {
    alert("Unable to play audio: " + error.message);
  });
});
