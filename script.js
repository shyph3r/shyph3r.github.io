const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
}
menuToggle.addEventListener('click', () => {
  const opened = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
  menuToggle.setAttribute('aria-label', opened ? 'Close menu' : 'Open menu');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuToggle.focus();
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
const projectDetails = [
  { title: 'Aegis — Security & Attack Homelab', url: './aegis/infrastructure.png', items: [
    'Built an isolated lab with OWASP Juice Shop, Docker, Nginx, and Wazuh.',
    'Reproduced SQLi and IDOR with Burp Suite; automated checks with custom Nuclei templates.',
    'Added Wazuh rules for two blind spots: User-Agent-dependent suppression and SQLi bypasses returning HTTP 200.',
    'Validated 15+ scenarios using Python and the Wazuh REST API. Over 90% test-outcome agreement refers to matching lab results with alerts.'
  ] },
  { title: 'Derich Robots', url: 'https://drive.google.com/drive/folders/1WTWrVx4elrH7LgJk95MjWhPYdADfd1DI?usp=sharing', items: [
    'Team leadership: Led a team in designing and building a robot for ball retrieval, shooting, and flag capture.',
    'Embedded programming: Programmed Arduino-based sensor and motor control systems.',
    'Mechanical engineering: Measured, fabricated, and assembled mechanical components. Project tools included Arduino and SolidWorks.'
  ] },
  { title: 'Mobile App Projects', url: 'https://drive.google.com/drive/folders/1LWmN07-GhjRDJxiO6H8Ei2JHkFtvMUEt?usp=sharing', items: [
    'Development: Built mobile applications recreating useful everyday features such as calculators and reading tools.',
    'Technologies: React Native and Java.',
    'Demo: Watch the Find Books video embedded in the project section.'
  ] }
];
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projectDetails[Number(button.dataset.project)];
    document.querySelector('#dialog-title').textContent = project.title;
    const list = document.createElement('ul');
    project.items.forEach(text => {
      const item = document.createElement('li');
      item.textContent = text;
      list.append(item);
    });
    document.querySelector('#dialog-content').replaceChildren(list);
    document.querySelector('#dialog-resource').href = project.url;
    dialog.showModal();
  });
});
// Keep audio from different project demos from overlapping.
const projectVideos = document.querySelectorAll('video');
projectVideos.forEach(video => video.addEventListener('play', () => {
  projectVideos.forEach(other => { if (other !== video) other.pause(); });
}));
document.querySelectorAll('.dialog-close, .dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
} });
let toastTimeout;
document.querySelector('#copy-email').addEventListener('click', async () => {
  const email = document.querySelector('#email-link').getAttribute('href').replace('mailto:', '');
  const toast = document.querySelector('#toast');
  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = 'Copied: ' + email;
  } catch {
    toast.textContent = 'Please select and copy the email address above.';
  }
  clearTimeout(toastTimeout);
  toast.classList.add('visible');
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 4000);
});
// Start the demo with a clear invitation, while retaining native video controls.
const aegisVideo = document.querySelector('#aegis-video');
const videoLaunch = document.querySelector('.video-launch');
const videoFeedback = document.querySelector('.video-feedback');
videoLaunch.hidden = false;
let demoStarted = false;
function showVideoFeedback(message) {
  videoFeedback.textContent = message;
  videoFeedback.hidden = !message;
}
async function playAegis() {
  videoLaunch.hidden = true;
  showVideoFeedback('Loading the walkthrough…');
  aegisVideo.focus();
  try {
    await aegisVideo.play();
  } catch {
    if (!demoStarted) videoLaunch.hidden = false;
    showVideoFeedback('Unable to start playback. Try again or use “Open video” below.');
  }
}
videoLaunch.addEventListener('click', playAegis);
const chapterLinks = [...document.querySelectorAll('[data-chapter]')];
let pendingChapter = null;
function updateChapter() {
  let active = chapterLinks[0];
  chapterLinks.forEach(link => {
    if (aegisVideo.currentTime >= Number(link.dataset.chapter)) active = link;
  });
  chapterLinks.forEach(link => {
    if (link === active) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}
chapterLinks.forEach(link => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  const seconds = Number(link.dataset.chapter);
  if (aegisVideo.readyState >= 1) {
    aegisVideo.currentTime = seconds;
    pendingChapter = null;
  } else pendingChapter = seconds;
  playAegis();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  aegisVideo.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'center' });
}));
aegisVideo.addEventListener('loadedmetadata', () => {
  if (pendingChapter !== null) {
    aegisVideo.currentTime = pendingChapter;
    pendingChapter = null;
  }
  updateChapter();
});
aegisVideo.addEventListener('timeupdate', updateChapter);
aegisVideo.addEventListener('seeked', updateChapter);
updateChapter();
aegisVideo.addEventListener('playing', () => {
  demoStarted = true;
  videoLaunch.hidden = true;
  showVideoFeedback('');
});
aegisVideo.addEventListener('waiting', () => {
  if (!aegisVideo.paused) showVideoFeedback('Buffering the video…');
});
aegisVideo.addEventListener('pause', () => showVideoFeedback(''));
aegisVideo.addEventListener('ended', () => showVideoFeedback('Walkthrough complete. Replay using the video controls, or explore the architecture below.'));
aegisVideo.addEventListener('error', () => {
  videoLaunch.hidden = true;
  showVideoFeedback('This video could not be loaded. Use “Open video” below to view it directly.');
});

// Keep full-size images accessible without leaving the portfolio.
const imageDialog = document.querySelector('#image-dialog');
const imagePreview = document.querySelector('#image-preview');
const imageViewport = document.querySelector('.image-viewport');
const imageZoom = document.querySelector('#image-zoom');
function resetImageZoom() {
  imageViewport.classList.remove('zoomed');
  imageZoom.setAttribute('aria-pressed', 'false');
  imageZoom.textContent = 'Zoom in';
  imageViewport.scrollTop = imageViewport.scrollLeft = 0;
}
const imageTitles = {
  './aegis/infrastructure.png': 'Aegis — Lab architecture',
  './derich/KK%20Robot.jpg': 'Derich — Robotics team',
  './cert/Orange%20Belt.png': 'pwn.college — Orange Belt'
};
document.querySelectorAll('a[href]').forEach(link => {
  const title = imageTitles[link.getAttribute('href')];
  if (!title) return;
  link.setAttribute('aria-haspopup', 'dialog');
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    resetImageZoom();
    imagePreview.src = link.href;
    imagePreview.alt = link.querySelector('img')?.alt || title;
    document.querySelector('#image-title').textContent = title;
    document.querySelector('#image-original').href = link.href;
    imageDialog.showModal();
  });
});
imageZoom.addEventListener('click', () => {
  const zoomed = imageViewport.classList.toggle('zoomed');
  imageZoom.setAttribute('aria-pressed', String(zoomed));
  imageZoom.textContent = zoomed ? 'Fit image' : 'Zoom in';
});
document.querySelector('#image-close').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('close', resetImageZoom);
imageDialog.addEventListener('click', event => {
  if (event.target !== imageDialog) return;
  const bounds = imageDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) imageDialog.close();
});

// Scroll position, current section, and a shortcut back to the introduction.
const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const scrollProgress = document.querySelector('.reading-progress');
const backTop = document.querySelector('#back-top');
let scrollScheduled = false;
function updateScrollUI() {
  const maximum = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.transform = `scaleX(${maximum > 0 ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0})`;
  backTop.hidden = window.scrollY < 700;
  let current = null;
  sectionLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section && section.getBoundingClientRect().top <= 150) current = link;
  });
  if (maximum > 0 && window.scrollY >= maximum - 4) current = sectionLinks.at(-1);
  sectionLinks.forEach(link => {
    if (link === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollScheduled = false;
}
function scheduleScrollUI() {
  if (!scrollScheduled) {
    scrollScheduled = true;
    requestAnimationFrame(updateScrollUI);
  }
}
window.addEventListener('scroll', scheduleScrollUI, { passive: true });
window.addEventListener('resize', scheduleScrollUI);
window.addEventListener('load', scheduleScrollUI);
backTop.addEventListener('click', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
  document.querySelector('.brand').focus({ preventScroll: true });
});
updateScrollUI();
