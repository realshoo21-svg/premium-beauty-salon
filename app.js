const images = {
  home: 'assets/images/home-hero.jpg.jpg',
  about: 'assets/images/about-salon.jpg.png',
  services: 'assets/images/service.jpg.jpg',
  packages: 'assets/images/packages.jpg.jpg',
  offers: 'assets/images/offers .jpg.jpg',
  team: 'assets/images/team.jpg.png',
  contact: 'assets/images/contect.jpg.png'
};

const galleryImages = [
  'assets/images/gallery/gallery-01.jpg.jpg',
  'assets/images/gallery/gallery-02.jpg.jpg',
  'assets/images/gallery/gallery-03.jpg.jpg',
  'assets/images/gallery/gallery-04.jpg.jpg',
  'assets/images/gallery/gallery-05.jpg.jpg'
];

const contactLinks = {
  phone: 'tel:+923001234567',
  whatsapp: 'https://wa.me/923001234567',
  email: 'mailto:info@premiumbeauty.com',
  directions: 'https://www.google.com/maps/search/?api=1&query=Tehsil+Shah+Alam+Pul%2C+Peshawar%2C+Khyber+Pakhtunkhwa%2C+Pakistan'
};

const pageCopy = {
  home: ['Welcome to Premium Beauty Salon', 'Hair, makeup, skin, nails and bridal beauty services in a relaxing environment.'],
  about: ['About Premium Beauty Salon', 'We create polished, personal beauty experiences with care, quality products and professional service.'],
  services: ['Our Services', 'Choose a beauty service that suits your day, your style and your occasion.'],
  packages: ['Our Packages', 'Thoughtfully arranged beauty packages for bridal moments, celebrations and self-care.'],
  offers: ['Current Offers', 'Discover our latest beauty inspiration and salon offers. Contact us for availability.'],
  team: ['Our Team', 'Meet the professionals who bring thoughtful styling, makeup and beauty care to every appointment.']
};

function renderPage(page) {
  const app = document.querySelector('#app');
  const active = page === 'gallery' || page === 'contact' || page === 'appointment' ? page : page;
  document.querySelectorAll('.site-nav a').forEach(link => link.toggleAttribute('aria-current', link.getAttribute('href') === `#${active}`));
  if (page === 'gallery') {
    app.innerHTML = `<section class="page"><img class="page-visual" src="assets/images/home-hero.jpg.jpg" alt="Premium Beauty Salon bridal beauty"><div class="intro"><h1>Gallery</h1><p>A selection of bridal beauty, makeup and salon moments.</p></div><div class="gallery-grid">${galleryImages.map((src, index) => `<button class="gallery-card" type="button" data-image="${src}"><img src="${src}" alt="Salon gallery image ${index + 1}"></button>`).join('')}</div></section>`;
    bindGallery();
    return;
  }
  if (page === 'contact' || page === 'appointment') {
    const appointment = page === 'appointment';
    app.innerHTML = `<section class="page"><img class="page-visual" src="${images.contact}" alt="Premium Beauty Salon contact" usemap="#contact-actions"><map name="contact-actions"><area shape="rect" coords="70,535,370,635" href="${contactLinks.phone}" alt="Call Premium Beauty Salon"><area shape="rect" coords="70,635,370,720" href="${contactLinks.whatsapp}" target="_blank" rel="noreferrer" alt="Chat on WhatsApp"><area shape="rect" coords="70,715,370,800" href="${contactLinks.email}" alt="Email Premium Beauty Salon"><area shape="rect" coords="70,790,390,910" href="${contactLinks.directions}" target="_blank" rel="noreferrer" alt="View salon location in Google Maps"><area shape="rect" coords="70,1235,290,1305" href="${contactLinks.directions}" target="_blank" rel="noreferrer" alt="Get Google Maps directions"><area shape="rect" coords="800,1245,1000,1340" href="${contactLinks.whatsapp}" target="_blank" rel="noreferrer" alt="Chat on WhatsApp"></map><div class="intro"><h1>${appointment ? 'Book an Appointment' : 'Contact Us'}</h1><p>${appointment ? 'Tell us what you would like to book and we will confirm your visit.' : 'We are here to help with questions, services and appointments.'}</p><div class="actions"><a class="button button-primary" href="${contactLinks.whatsapp}" target="_blank" rel="noreferrer">WhatsApp us</a><a class="button button-secondary" href="${contactLinks.phone}">Call +92 300 1234567</a>${!appointment ? `<a class="button button-secondary" href="${contactLinks.email}">Email us</a><a class="button button-secondary" href="${contactLinks.directions}" target="_blank" rel="noreferrer">Get Directions</a>` : ''}</div></div><div class="form-wrap"><h2>${appointment ? 'Appointment form' : 'Send us a message'}</h2><form data-form="${appointment ? 'appointment' : 'contact'}"><label>Full name<input name="name" required placeholder="Your name"></label><label>Phone number<input name="phone" required type="tel" placeholder="+92"></label><label>Email address<input name="email" type="email" placeholder="you@example.com"></label><label>Service<select name="service"><option>Hair Styling</option><option>Makeup</option><option>Skin Care</option><option>Nails</option><option>Bridal Services</option></select></label><label>${appointment ? 'Preferred date' : 'Message'}${appointment ? '<input name="date" required type="date">' : '<textarea name="message" required placeholder="How can we help?"></textarea>'}</label><button class="button button-primary" type="submit">${appointment ? 'Request Appointment' : 'Send Message'}</button></form></div>${!appointment ? '<section class="map-section"><h2>Find Us On Google Maps</h2><iframe class="map-frame" src="https://www.google.com/maps?q=Tehsil+Shah+Alam+Pul%2C+Peshawar%2C+Khyber+Pakhtunkhwa%2C+Pakistan&output=embed" title="Premium Beauty Salon location on Google Maps" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe></section>' : ''}</section>`;
    bindForm();
    return;
  }
  const [heading, text] = pageCopy[page] || pageCopy.home;
  app.innerHTML = `<section class="page"><img class="page-visual" src="${images[page] || images.home}" alt="${heading}"><div class="intro"><h1>${heading}</h1><p>${text}</p><div class="actions"><a class="button button-primary" href="#appointment">Book Appointment</a><a class="button button-secondary" href="#contact">Contact Us</a></div></div></section>`;
}

function bindGallery() {
  document.querySelectorAll('[data-image]').forEach(card => card.addEventListener('click', () => {
    const lightbox = document.querySelector('#lightbox');
    lightbox.querySelector('img').src = card.dataset.image;
    lightbox.querySelector('img').alt = card.querySelector('img').alt;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  }));
}

function bindForm() {
  document.querySelector('form')?.addEventListener('submit', event => {
    event.preventDefault();
    event.currentTarget.reset();
    showToast('Thank you. We will be in touch shortly.');
  });
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.setTimeout(() => toast.classList.remove('is-visible'), 3500);
}

function navigate() {
  const page = window.location.hash.slice(1) || 'home';
  renderPage(page);
  document.querySelector('#site-nav').classList.remove('is-open');
  document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
  window.scrollTo(0, 0);
}

document.querySelector('.menu-toggle').addEventListener('click', event => {
  const nav = document.querySelector('#site-nav');
  const open = nav.classList.toggle('is-open');
  event.currentTarget.setAttribute('aria-expanded', String(open));
});
document.querySelector('.lightbox-close').addEventListener('click', () => document.querySelector('#lightbox').classList.remove('is-open'));
document.querySelector('#lightbox').addEventListener('click', event => { if (event.target.id === 'lightbox') event.currentTarget.classList.remove('is-open'); });
window.addEventListener('hashchange', navigate);
navigate();