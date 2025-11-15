/* ========== BASIC SETUP ========== */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year')?.textContent = new Date().getFullYear();
});

/* ========= TYPING EFFECT ========= */
const TYPE_TEXT = "I build modern and creative web experiences";
const TYPING_EL = document.getElementById('typing');
let tIndex = 0;

function typeOnce() {
  if (!TYPING_EL) return;
  if (tIndex <= TYPE_TEXT.length) {
    TYPING_EL.textContent = TYPE_TEXT.slice(0, tIndex++);
    setTimeout(typeOnce, 55);
  } else {
    // delete after short pause, then loop
    setTimeout(() => deleteText(), 1000);
  }
}
function deleteText() {
  if (!TYPING_EL) return;
  if (tIndex >= 0) {
    TYPING_EL.textContent = TYPE_TEXT.slice(0, tIndex--);
    setTimeout(deleteText, 28);
  } else {
    tIndex = 0;
    setTimeout(typeOnce, 300);
  }
}
typeOnce();

/* ========= SCROLL REVEAL ========= */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ========= THEME TOGGLE ========= */
const toggle = document.getElementById('theme-toggle');
const toggleIcon = document.getElementById('toggle-icon');
const userPref = localStorage.getItem('v1xm-theme');

if (userPref) {
  document.body.classList.toggle('dark', userPref === 'dark');
  toggleIcon.textContent = userPref === 'dark' ? '🌙' : '🌞';
} else {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.body.classList.toggle('dark', prefersDark);
  toggleIcon.textContent = prefersDark ? '🌙' : '🌞';
}

toggle?.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  toggleIcon.textContent = isDark ? '🌙' : '🌞';
  localStorage.setItem('v1xm-theme', isDark ? 'dark' : 'light');
});

/* ========= KEYBOARD SHORTCUT ========= */
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 't') toggle?.click();
});

/* ========= NOTES ON VIDEO ========= */
/* Place bg.mp4 in same folder. Video is hidden in light mode to save bandwidth.
   If you want to lazy-load video only when user switches to dark, we can add that later. */
