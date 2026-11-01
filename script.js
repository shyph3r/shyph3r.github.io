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
  { title: 'Security & Attack Homelab', url: 'https://drive.google.com/drive/folders/1WTWrVx4elrH7LgJk95MjWhPYdADfd1DI?usp=sharing', items: [
    'Environment: Built an isolated security lab using Dockerized OWASP Juice Shop to simulate web attacks and investigate security events.',
    'Offensive testing: Reproduced SQL injection and IDOR vulnerabilities using Burp Suite. Developed custom Nuclei templates to automate checks and discover exposed API documentation and monitoring endpoints.',
    'Visibility: Engineered a centralized logging pipeline with an Nginx reverse proxy, capturing HTTP request/response metadata and integrating web and system logs with Wazuh SIEM.',
    'Detection engineering: Identified two blind spots — User-Agent-dependent rule suppression and SQLi authentication bypasses returning HTTP 200. Implemented custom Wazuh rules to improve visibility.',
    'Validation: Developed Python tools to execute 15+ control scenarios and correlate results with Wazuh Indexer alerts through its REST API, achieving over 90% test-outcome agreement within the lab.'
  ] },
  { title: 'Derich Robots', url: 'https://drive.google.com/drive/folders/1WTWrVx4elrH7LgJk95MjWhPYdADfd1DI?usp=sharing', items: [
    'Team leadership: Led a team in designing and building a robot for ball retrieval, shooting, and flag capture.',
    'Embedded programming: Programmed Arduino-based sensor and motor control systems.',
    'Mechanical engineering: Measured, fabricated, and assembled mechanical components. Project tools included Arduino and SolidWorks.'
  ] },
  { title: 'Mobile App Projects', url: 'https://drive.google.com/drive/folders/1LWmN07-GhjRDJxiO6H8Ei2JHkFtvMUEt?usp=sharing', items: [
    'Development: Built mobile applications recreating useful everyday features such as calculators and reading tools.',
    'Technologies: React Native and Java.',
    'Project materials: Explore the linked folder for supporting work included with my resume.'
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
