// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear()

// Lightbox functionality
const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightbox-img")
const caption = document.querySelector(".caption")
const closeBtn = document.querySelector(".close-btn")
const galleryImages = document.querySelectorAll(".gallery-img")

// Open lightbox when clicking on gallery images
galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block"
    lightboxImg.src = img.getAttribute("data-full") || img.src
    caption.textContent = img.alt
    document.body.style.overflow = "hidden" // Prevent scrolling when lightbox is open
  })
})

// Close lightbox when clicking on close button
closeBtn.addEventListener("click", closeLightbox)

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", function (e) {
  if (e.target === this) {
    closeLightbox()
  }
})

// Close lightbox when pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox()
  }
})

// Function to close the lightbox
function closeLightbox() {
  lightbox.style.display = "none"
  document.body.style.overflow = "" // Restore scrolling
}

// Add touch swipe support for mobile devices
let touchStartX = 0
let touchEndX = 0

lightbox.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX
})

lightbox.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
})

function handleSwipe() {
  // If swipe distance is significant enough
  if (Math.abs(touchEndX - touchStartX) > 50) {
    closeLightbox()
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Offset for the fixed navbar
        behavior: "smooth",
      })

      // Update active link
      document.querySelectorAll("nav a").forEach((link) => {
        link.classList.remove("active")
      })
      this.classList.add("active")
    }
  })
})

// Add active class to nav links on scroll
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY

  // Get all sections
  const sections = document.querySelectorAll("section[id]")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelector('nav a[href="#' + sectionId + '"]').classList.add("active")
    } else {
      document.querySelector('nav a[href="#' + sectionId + '"]').classList.remove("active")
    }
  })
})

// Add animation to gallery items
const galleryItems = document.querySelectorAll(".gallery-item")
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

galleryItems.forEach((item) => {
  item.style.opacity = 0
  item.style.transform = "translateY(20px)"
  item.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  observer.observe(item)
})
