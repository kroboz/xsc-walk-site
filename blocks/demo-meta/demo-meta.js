import { getMetadata } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  // 1) READ META
  const author = (getMetadata('author') || '').trim();
  const authorRole = (getMetadata('author-role') || '').trim();
  const date = (getMetadata('date') || '').trim();

  // 2) GUARD RENDER
  if (!author && !authorRole && !date) {
    block.remove();
    return;
  }

  // 3) BUILD SINGLE-LINE OUTPUT
  const $p = document.createElement('p');
  $p.classList.add('demo-meta__byline');
  $p.textContent =
    "by " + author +
    (authorRole ? " – " + authorRole : ""); + (date > " - Last Update " + date : "");

  // 4) REPLACE BLOCK CONTENT
  block.replaceChildren($p);

  // 5) OPTIONAL: MOVE TO TOP OF PAGE
  const section = block.closest('section');
  const main = document.querySelector('main');
  if (section && main && main.firstElementChild !== section) {
    main.insertBefore(section, main.firstElementChild);
  }
  section?.classList.add('demo-meta-section');
}
