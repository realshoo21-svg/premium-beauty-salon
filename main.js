// Central config
const CONTACT_WHATSAPP_NUMBER = '+923000000000'; // change in one place

// Navigation toggle
document.addEventListener('DOMContentLoaded', ()=>{
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if(navToggle){
    // ensure initial aria state
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', ()=>{
      nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  // Active link highlighting
  document.querySelectorAll('.nav-link').forEach(a=>{
    try{
      const href = a.getAttribute('href');
      if(!href) return;
      if(href === location.pathname.split('/').pop() || a.href === location.href) a.classList.add('active');
      // close mobile nav when clicking a link
      a.addEventListener('click', ()=>{ if(nav && nav.classList.contains('open')) nav.classList.remove('open'); });
    }catch(e){/* ignore */}
  });

  // WhatsApp FAB
  const fab = document.getElementById('whatsapp-fab');
  if(fab){
    fab.addEventListener('click', ()=>{
      const text = encodeURIComponent('Hello, I would like to inquire about your services.');
      window.open(`https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(/[^0-9]/g,'')}?text=${text}`,'_blank');
    });
    fab.setAttribute('title','Chat on WhatsApp');
  }

  // Book buttons open appointment modal
  document.querySelectorAll('#book-btn, .book-package, .book-offer').forEach(btn=>{
    btn.addEventListener('click', ()=>openAppointmentModal(btn.dataset.package||btn.dataset.offer||''));
  });

  // Modal behavior
  const modal = document.getElementById('appointment-modal');
  const modalClose = modal && modal.querySelector('.modal-close');
  if(modalClose) modalClose.addEventListener('click', ()=>closeModal());
  // close modal on overlay click
  if(modal) modal.addEventListener('click',(e)=>{ if(e.target===modal) closeModal(); });

  function openAppointmentModal(prefill){
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');
    const service = modal.querySelector('[name=service]');
    const nameInput = modal.querySelector('[name=name]');
    if(service && prefill) service.value = prefill;
    // focus first field
    if(nameInput) nameInput.focus();
  }
  function closeModal(){ if(modal) modal.setAttribute('aria-hidden','true'); }

  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    // add inline status element
    let status = contactForm.querySelector('.form-status');
    if(!status){ status = document.createElement('div'); status.className='form-status'; contactForm.prepend(status); }
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      status.textContent='';
      const fm = new FormData(contactForm);
      const name = (fm.get('name')||'').toString().trim();
      const email = (fm.get('email')||'').toString().trim();
      const phone = (fm.get('phone')||'').toString().trim();
      const message = (fm.get('message')||'').toString().trim();
      const phoneValid = /^[0-9+\-\s]{7,20}$/.test(phone);
      if(!name||!email||!phone||!message) return status.textContent='Please fill all fields.';
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return status.textContent='Please enter a valid email address.';
      if(!phoneValid) return status.textContent='Please enter a valid phone number.';
      // show success message
      status.style.color = 'green'; status.textContent = 'Message sent — we will contact you shortly.';
      contactForm.reset();
    });
  }

  // Appointment form handling with WhatsApp confirmation option
  const apForm = document.getElementById('appointment-form');
  if(apForm){
    const apStatus = document.createElement('div'); apStatus.className='form-status'; apForm.prepend(apStatus);
    apForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      apStatus.textContent='';
      const fm = new FormData(apForm);
      const name = (fm.get('name')||'').toString().trim();
      const email = (fm.get('email')||'').toString().trim();
      const phone = (fm.get('phone')||'').toString().trim();
      const date = (fm.get('date')||'').toString().trim();
      const time = (fm.get('time')||'').toString().trim();
      if(!name||!email||!phone||!date||!time) return apStatus.textContent='Please complete all required fields.';
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return apStatus.textContent='Please enter a valid email address.';
      const phoneValid = /^[0-9+\-\s]{7,20}$/.test(phone);
      if(!phoneValid) return apStatus.textContent='Please enter a valid phone number.';
      // show confirmation details
      apForm.classList.add('hidden');
      const conf = document.getElementById('appointment-confirm');
      if(conf){
        conf.classList.remove('hidden');
        conf.querySelector('p').textContent = `Thank you ${name} — appointment requested for ${date} at ${time}. We will confirm shortly.`;
        const confirmWhats = document.getElementById('confirm-whatsapp');
        if(confirmWhats){
          confirmWhats.onclick = ()=>{
            const text = encodeURIComponent(`Hello, I have requested an appointment. Name: ${name}. Service: ${fm.get('service')||''}. Date: ${date}. Time: ${time}. Phone: ${phone}.`);
            window.open(`https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(/[^0-9]/g,'')}?text=${text}`,'_blank');
          };
        }
      }
    });
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const gallery = document.getElementById('gallery');
  let currentIndex = 0; let galleryItems = [];
  if(gallery){
    galleryItems = Array.from(gallery.querySelectorAll('.gallery-item img'));
    galleryItems.forEach((img,i)=> img.addEventListener('click', ()=>openLightbox(i)));
  }
  function openLightbox(i){
    if(!lightbox) return; currentIndex = i; updateLightbox(); lightbox.setAttribute('aria-hidden','false');
  }
  function closeLightbox(){ if(lightbox) lightbox.setAttribute('aria-hidden','true'); }
  function updateLightbox(){
    const imgEl = lightbox.querySelector('.lightbox-content img');
    imgEl.src = galleryItems[currentIndex].src; imgEl.alt = galleryItems[currentIndex].alt;
  }
  const lbClose = document.querySelector('.lightbox-close');
  const lbPrev = document.querySelector('.lightbox-prev');
  const lbNext = document.querySelector('.lightbox-next');
  if(lbClose) lbClose.addEventListener('click', closeLightbox);
  if(lbPrev) lbPrev.addEventListener('click', ()=>{ if(galleryItems.length){ currentIndex = (currentIndex-1+galleryItems.length)%galleryItems.length; updateLightbox(); } });
  if(lbNext) lbNext.addEventListener('click', ()=>{ if(galleryItems.length){ currentIndex = (currentIndex+1)%galleryItems.length; updateLightbox(); } });
  // close when clicking backdrop
  if(lightbox) lightbox.addEventListener('click',(e)=>{ if(e.target===lightbox) closeLightbox(); });
  document.addEventListener('keydown',(e)=>{
    if(lightbox && lightbox.getAttribute('aria-hidden')==='false'){
      if(e.key==='Escape') closeLightbox();
      if(e.key==='ArrowLeft') lbPrev && lbPrev.click();
      if(e.key==='ArrowRight') lbNext && lbNext.click();
    }
  });

  // Gallery filters
  document.querySelectorAll('.filter').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item=>{
        item.style.display = (f==='all' || item.dataset.category===f)?'block':'none';
      });
    });
  });

  // IntersectionObserver for reveals
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        if(entry.target.classList.contains('reveal-grid')){
          const items = entry.target.querySelectorAll('.card, .gallery-item, .team-card');
          items.forEach((el,i)=>{ setTimeout(()=>el.classList.add('is-visible'), i*100); });
        }
        // stop observing once visible to avoid replay
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('.reveal-up, .reveal-grid').forEach(el=>io.observe(el));

});
