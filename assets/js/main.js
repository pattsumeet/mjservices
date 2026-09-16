/**
 * MJ "ATOZ" SERVICES - Main Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileClose = document.getElementById('mobileClose');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.add('open');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.remove('open');
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Close drawer on link click
  document.querySelectorAll('.mobile-nav-list .nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 2. Sticky Header Elevation
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Certificate Lightbox Modal
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('[data-cert-img]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = btn.getAttribute('data-cert-img');
      const title = btn.getAttribute('data-cert-title') || 'Official Certificate';
      
      if (lightbox && lightboxImg && lightboxTitle) {
        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeLightbox();
    }
  });
});
