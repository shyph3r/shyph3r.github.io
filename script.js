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
  { title: 'Derich Robots', url: './derich/KK%20Robot.jpg', items: [
    'Team leadership: Led a team in designing and building a robot for ball retrieval, shooting, and flag capture.',
    'Embedded programming: Programmed Arduino-based sensor and motor control systems.',
    'Mechanical engineering: Measured, fabricated, and assembled mechanical components. Project tools included Arduino and SolidWorks.'
  ] },
  { title: 'Mobile App Projects', url: './mobile_app/Find%20books.mp4', items: [
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
