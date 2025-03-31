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
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Project details modal (you can expand this)
function showProjectDetails(projectId) {
    // Add modal logic here
    alert(`Showing details for ${projectId}`);
}

// Scroll to section function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Navbar hide/show on scroll
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

function openLightbox(imageSrc, srcset = "") {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    
    // Set the image source and optional srcset for responsive images
    lightboxImage.src = imageSrc;
    if (srcset) {
        lightboxImage.srcset = srcset;
    }

    // Show the modal
    lightboxModal.style.display = "flex"; // Use flexbox to center the image
}

function closeLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    lightboxModal.style.display = "none"; // Hide the modal when closed
}

document.querySelector('.hamburger').addEventListener('click', function () {
    document.querySelector('.navbar').classList.toggle('open');
});



// Close lightbox when clicking outside of the image
window.onclick = function(event) {
    const lightbox = document.getElementById('lightboxModal');
    if (event.target === lightbox) {
        closeLightbox();
    }
}

// Close the lightbox with ESC key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});
