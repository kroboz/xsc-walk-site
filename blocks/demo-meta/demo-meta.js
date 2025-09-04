import { getMetadata } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  const author = getMetadata('author') || '';
  const role = getMetadata('author-role') || '';

  if (!author && !role) {
    block.remove();
    return;
  }

  const wrap = document.createElement('div');
  wrap.className = 'demo-meta__inner';

  if (author) {
    const name = document.createElement('span');
    name.className = 'demo-meta__name';
    name.textContent = author;
    wrap.appendChild(name);
  }

  if (role) {
    const sep = document.createElement('span');
    sep.className = 'demo-meta__sep';
    sep.textContent = ' – ';
    wrap.appendChild(sep);

    const r = document.createElement('span');
    r.className = 'demo-meta__role';
    r.textContent = role;
    wrap.appendChild(r);
  }

  block.textContent = '';
  block.appendChild(wrap);

  const section = block.closest('section');
  const main = document.querySelector('main');
  if (section && main && main.firstElementChild !== section) {
    main.insertBefore(section, main.firstElementChild);
  }
  section?.classList.add('demo-meta-section');
}
