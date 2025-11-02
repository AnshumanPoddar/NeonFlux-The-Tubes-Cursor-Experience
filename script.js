import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

const canvas = document.getElementById("canvas");

const app = TubesCursor(canvas, {
  tubes: {
    count: 14,
    colors: ["#ff00d4", "#00eaff", "#00ff9d"],
    speed: 1.5,
    radius: 0.008,
    lights: {
      intensity: 250,
      colors: ["#ff00aa", "#00d9ff", "#aaff00", "#ff8800"]
    }
  },
  motion: {
    parallax: 0.03,
    smoothness: 0.08
  },
  bloom: {
    strength: 0.9,
    radius: 0.6,
    threshold: 0.1
  }
});

// Smooth parallax tilt effect
const hero = document.querySelector('.hero');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  hero.style.setProperty('--rx', `${y * -10}deg`);
  hero.style.setProperty('--ry', `${x * 10}deg`);
});

// Click to randomize glowing colors
document.body.addEventListener("click", () => {
  const colors = randomColors(3);
  const lightsColors = randomColors(4);
  app.tubes.setColors(colors);
  app.tubes.setLightsColors(lightsColors);
});

function randomColors(count) {
  return Array.from({ length: count }, () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
  );
}

// Dynamic light pulse
setInterval(() => {
  const t = Date.now() * 0.002;
  app.tubes.lights.intensity = 220 + Math.sin(t) * 90;
}, 50);
