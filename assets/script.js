// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form submission
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

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
  
  // Close the lightbox
  function closeLightbox() {
    document.getElementById('lightboxModal').style.display = 'none';
  }
  
  // ---- Bind thumbnail clicks ----
  function bindGalleryThumbnails(selector) {
    document.querySelectorAll(selector).forEach(img => {
      // find the wrapping gallery-item container (optional)
      img.closest(selector.replace(' img','')).addEventListener('click', e => {
        e.preventDefault();
        openLightbox(img);
      });
    });
  }
  
  // Once DOM is ready, wire everything up
  document.addEventListener('DOMContentLoaded', () => {
    // 1) Thumbnails in gallery 1
    bindGalleryThumbnails('.gallery-item img');
  
    // 2) Thumbnails in gallery 2
    bindGalleryThumbnails('.gallery-item-2 img');
  
    // 3) Close button (the ✕)
    const closeBtn = document.querySelector('.lightbox-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }
  
    // 4) Click outside the image (on the overlay)
    const lightboxModal = document.getElementById('lightboxModal');
    lightboxModal.addEventListener('click', e => {
      // if the clicked element _is_ the overlay container itself, close
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  
    // 5) Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    });
  });
// Responsive image handling
function updateProjectImages() {
    const projectImages = document.querySelectorAll(".project-img");
    projectImages.forEach(img => {
        img.src = window.innerWidth <= 767 
            ? img.dataset.mobile 
            : img.dataset.desktop;
    });
}

// Gallery expansion toggle
function toggleGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const showMoreBtn = document.querySelector('.show-more-btn');
    
    galleryGrid.classList.toggle('expanded');
    showMoreBtn.textContent = galleryGrid.classList.contains('expanded') 
        ? 'Show Less' 
        : 'Show More';
}

// Initialize responsive images
window.addEventListener("DOMContentLoaded", updateProjectImages);
window.addEventListener("resize", updateProjectImages);

// Navbar scroll behavior
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    if (prevScrollpos > currentScrollPos) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
}

// Mobile menu toggle (if you have hamburger menu)
document.querySelector('.hamburger')?.addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('open');
});

const breadcrumb = document.getElementById('breadcrumbTop');
const SHOW_THRESHOLD = 300;

window.addEventListener('scroll', () => {
  if (window.pageYOffset > SHOW_THRESHOLD) {
    breadcrumb.classList.add('breadcrumb--visible');
    breadcrumb.classList.remove('breadcrumb--hidden');
  } else {
    breadcrumb.classList.add('breadcrumb--hidden');
    breadcrumb.classList.remove('breadcrumb--visible');
  }
});

breadcrumb.querySelector('a').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  