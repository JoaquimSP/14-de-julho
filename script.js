// Hero Slider
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide")
  const dotsContainer = document.querySelector(".slider-dots")
  const prevBtn = document.querySelector(".slider-btn.prev")
  const nextBtn = document.querySelector(".slider-btn.next")
  let currentSlide = 0
  let slideInterval

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("span")
    dot.classList.add("dot")
    if (index === 0) dot.classList.add("active")
    dot.addEventListener("click", () => goToSlide(index))
    dotsContainer.appendChild(dot)
  })

  const dots = document.querySelectorAll(".dot")

  function goToSlide(n) {
    slides[currentSlide].classList.remove("active")
    dots[currentSlide].classList.remove("active")

    currentSlide = (n + slides.length) % slides.length

    slides[currentSlide].classList.add("active")
    dots[currentSlide].classList.add("active")
  }

  function nextSlide() {
    goToSlide(currentSlide + 1)
  }

  function prevSlide() {
    goToSlide(currentSlide - 1)
  }

  function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000)
  }

  function stopSlideShow() {
    clearInterval(slideInterval)
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    nextSlide()
    stopSlideShow()
    startSlideShow()
  })

  prevBtn.addEventListener("click", () => {
    prevSlide()
    stopSlideShow()
    startSlideShow()
  })

  // Start automatic slideshow
  startSlideShow()

  // Pause on hover
  const slider = document.querySelector(".slider")
  slider.addEventListener("mouseenter", stopSlideShow)
  slider.addEventListener("mouseleave", startSlideShow)
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 92
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Mobile menu toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const nav = document.querySelector(".nav")

mobileMenuToggle.addEventListener("click", () => {
  nav.style.display = nav.style.display === "flex" ? "none" : "flex"

  // Toggle animation for hamburger menu
  mobileMenuToggle.classList.toggle("active")
})

// Add scroll effect to header
let lastScroll = 0
const header = document.querySelector(".header")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    header.style.padding = "0.5rem 0"
  } else {
    header.style.padding = "1rem 0"
  }

  lastScroll = currentScroll
})

// Add entrance animation to product cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "0"
      entry.target.style.transform = "translateY(30px)"

      setTimeout(() => {
        entry.target.style.transition = "all 0.6s ease"
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }, 100)

      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

document.querySelectorAll(".product-card").forEach((card) => {
  observer.observe(card)
})
