document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("sparkCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Spark {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.life = Math.random() * 40 + 30;
      this.alpha = 1;
    }

    update() {
      this.y -= 0.5;
      this.alpha -= 0.02;
      this.life--;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
      ctx.shadowColor = "white";
      ctx.shadowBlur = 10;
      ctx.fill();
    }
  }

  const sparks = [];

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.2) {
      sparks.push(new Spark());
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.update();
      s.draw();
      if (s.life <= 0 || s.alpha <= 0) {
        sparks.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
});