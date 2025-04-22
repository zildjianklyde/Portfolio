// Smooth scroll helper for buttons
function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth' });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const dest = this.getAttribute('href').slice(1);
    scrollToSection(dest);
  });
});

// Contact form submission
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your message! I will get back to you soon.');
  this.reset();
});

// Lightbox open/close
function openLightbox(source) {
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');

  let src, srcset, alt;
  if (typeof source === 'string') {
    src    = source;
    srcset = '';
    alt    = '';
  } else {
    src    = source.dataset.full || source.src;
    srcset = source.srcset;
    alt    = source.alt;
  }

  lightboxImage.src    = src;
  lightboxImage.srcset = srcset;
  lightboxImage.alt    = alt;
  lightboxModal.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightboxModal').style.display = 'none';
}

// Bind gallery thumbnails (supports both gallery grids)
function bindGalleryThumbnails(selector) {
  document.querySelectorAll(selector).forEach(img => {
    img.closest(selector.replace(' img','')).addEventListener('click', e => {
      e.preventDefault();
      openLightbox(img);
    });
  });
}

// Once DOM is ready, wire everything up
document.addEventListener('DOMContentLoaded', () => {
  // Button-driven scroll
  document.querySelectorAll('.cta-btn[onclick^="scrollToSection"]').forEach(btn => {
    // nothing—inline onclick already calls scrollToSection
  });

  // Gallery thumbnails
  bindGalleryThumbnails('.gallery-item img');
  bindGalleryThumbnails('.gallery-item-2 img');

  // Lightbox close button
  const closeBtn = document.querySelector('.lightbox-close');
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  // Click outside image to close lightbox
  const lightboxModal = document.getElementById('lightboxModal');
  if (lightboxModal) {
    lightboxModal.addEventListener('click', e => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Escape key to close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Responsive project images
  function updateProjectImages() {
    document.querySelectorAll(".project-img").forEach(img => {
      img.src = window.innerWidth <= 767 ? img.dataset.mobile : img.dataset.desktop;
    });
  }
  updateProjectImages();
  window.addEventListener("resize", updateProjectImages);

  // Toggle “Show More” gallery
  document.querySelector('.show-more-btn')?.addEventListener('click', function() {
    const grid = document.querySelector('.gallery-grid');
    grid.classList.toggle('expanded');
    this.textContent = grid.classList.contains('expanded') ? 'Show Less' : 'Show More';
  });

  // Navbar hide/show on scroll
  let prevScrollpos = window.pageYOffset;
  window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    if (prevScrollpos > current) navbar.style.top = "0";
    else navbar.style.top = "-50px";
    prevScrollpos = current;
  });

  // Hamburger toggle
  document.querySelector('.hamburger')?.addEventListener('click', () => {
    document.querySelector('.navbar').classList.toggle('open');
  });

  // Breadcrumb “Back to Top” visibility & click
  const breadcrumb = document.getElementById('breadcrumbTop');
  const SHOW_THRESHOLD = 300;
  if (breadcrumb) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > SHOW_THRESHOLD) {
        breadcrumb.classList.add('breadcrumb--visible');
        breadcrumb.classList.remove('breadcrumb--hidden');
      } else {
        breadcrumb.classList.add('breadcrumb--hidden');
        breadcrumb.classList.remove('breadcrumb--visible');
      }
    });
    breadcrumb.querySelector('a')?.addEventListener('click', function(e) {
      e.preventDefault();
      scrollToSection('home');
    });
  }
});
