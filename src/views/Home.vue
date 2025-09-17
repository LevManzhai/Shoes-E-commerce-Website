<template>
  <div class="home">

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h2 class="hero-title">Find Your Sole Mate With Us.</h2>
            <p class="hero-description">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod.</p>
            <router-link to="/shop" class="btn-primary">Shop Now</router-link>
          </div>
          <div class="hero-image">
            <div class="shoe-display">
              <img :src="'/assets/images/shoes/shoes-1.png'" alt="Trendy Slick Pro" class="main-shoe">
              <div class="shoe-info">
                <h3>Trendy Slick Pro</h3>
                <p class="price">£39.99</p>
              </div>
            </div>
            <div class="vertical-text">ULTIMATE</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Brand Logos -->
    
  <div class="logos">
    <div class="logos-slide">
      <span>ebay</span>
      <span>amazon.com</span>
      <span>AJIO</span>
      <span>Nike</span>
      <span>Adidas</span>
      <span>Puma</span>
    </div>
      
    <div class="logos-slide">
      <span>ebay</span>
      <span>amazon.com</span>
      <span>AJIO</span>
      <span>Nike</span>
      <span>Adidas</span>
      <span>Puma</span>
    </div>
    <div class="logos-slide">
      <span>ebay</span>
      <span>amazon.com</span>
      <span>AJIO</span>
      <span>Nike</span>
      <span>Adidas</span>
      <span>Puma</span>
    </div>
    <div class="logos-slide">
      <span>ebay</span>
      <span>amazon.com</span>
      <span>AJIO</span>
      <span>Nike</span>
      <span>Adidas</span>
      <span>Puma</span>
    </div>
  </div>


    <!-- Most Popular Products -->
    <section class="popular-products">
      <div class="container">
        <div class="trending-section">
          <div class="trending-content">
            <div class="trending-line"></div>
            <h3 class="trending-subtitle">Our Trending Shoes</h3>
            <h2 class="trending-title">Most Popular<br>Products</h2>
            <p class="trending-description">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit,</p>
            <router-link to="/shop" class="btn-explore">Explore</router-link>
          </div>
          <div class="trending-carousel">
            <div class="carousel-container" ref="carouselContainer" 
                 @mousedown="startDrag" 
                 @mousemove="onDrag" 
                 @mouseup="endDrag" 
                 @mouseleave="endDrag"
                 @touchstart="startDrag" 
                 @touchmove="onDrag" 
                 @touchend="endDrag">
              <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                <div class="carousel-slide" v-for="(slide, slideIndex) in carouselSlides" :key="slideIndex">
                  <div class="carousel-products">
                    <div class="product-card" v-for="(product, index) in slide" :key="index" @click="goToProduct(product.id)">
                      <img :src="product.image" :alt="product.name" class="product-image">
                      <h4 class="product-name">{{ product.name }}</h4>
                      <p class="product-price">{{ product.currentPrice }}</p>
                      <button class="add-to-cart-btn" @click.stop="addToCart(product.id)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-dots">
              <span 
                v-for="(dot, index) in carouselSlides" 
                :key="index"
                class="dot" 
                :class="{ active: currentSlide === index }"
                @click="goToSlide(index)"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Banner -->
    <section class="cta-banner">
      <div class="container">
        <div class="banner-content">
          <div class="banner-image">
            <img :src="'img/shoes/shoes-2.png'" alt="Slick Shoes" class="banner-shoe">
            <div class="banner-text-overlay">Slick</div>
          </div>
          <div class="banner-text">
            <h2>Are you ready to lead the way?</h2>
            <p>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do</p>
            <router-link to="/shop" class="btn-white">Explore</router-link>
            <div class="banner-thumbnails">
              <img :src="'img/shoes/shoes-3.png'" alt="Shoe 1" class="thumbnail">
              <img :src="'img/shoes/shoes-4.png'" alt="Shoe 2" class="thumbnail">
              <img :src="'img/shoes/shoes-5.png'" alt="Shoe 3" class="thumbnail">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Selling Section -->
    <section class="best-selling">
      <div class="container">
        <h2 class="section-title">Best Selling</h2>
        <div class="category-tabs">
          <button class="tab" :class="{ active: selectedGender === 'all' }" @click="filterByGender('all')">All</button>
          <button class="tab" :class="{ active: selectedGender === 'men' }" @click="filterByGender('men')">Man</button>
          <button class="tab" :class="{ active: selectedGender === 'women' }" @click="filterByGender('women')">Woman</button>
        </div>
        <div class="products-grid">
          <div class="product-card" v-for="(product, index) in filteredBestSellingProducts" :key="index" @click="goToProduct(product.id)">
            <div class="new-badge">NEW</div>
            <img :src="product.image" :alt="product.name" class="product-image">
            <h4 class="product-name">{{ product.name }}</h4>
            <div class="price-container">
              <span class="current-price">{{ product.currentPrice }}</span>
              <span class="original-price">{{ product.originalPrice }}</span>
            </div>
            <button class="add-to-cart-btn" @click.stop="addToCart(product.id)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Client Testimonials -->
    <section class="testimonials">
      <div class="container">
        <h2 class="section-title">Client Testimonial</h2>
        <div class="testimonials-carousel">
          <div class="testimonial-card">
            <div class="testimonial-avatar">
              <img src="/assets/images/testimonials/persone-1.jpg" alt="Meythli Odex">
            </div>
            <h4>Meythli Odex</h4>
            <p>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.</p>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-avatar">
              <img src="/assets/images/testimonials/persone-2.jpg" alt="Meythli Odex">
            </div>
            <h4>Meythli Odex</h4>
            <p>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.</p>
          </div>
        </div>
        <div class="carousel-dots">
          <span class="dot active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </section>




  </div>
</template>

<script>
import { popularProducts, bestSellingProducts } from '../data/products.js'

export default {
  name: 'Home',
  data() {
    return {
      popularProducts,
      bestSellingProducts,
      currentSlide: 0,
      carouselSlides: [],
      autoSlideInterval: null,
      isDragging: false,
      startX: 0,
      currentX: 0,
      dragThreshold: 50,
      selectedGender: 'all',
      newsletterEmail: '',
      privacyModal: false
    }
  },
  computed: {
    filteredBestSellingProducts() {
      if (this.selectedGender === 'all') {
        return this.bestSellingProducts
      }
      return this.bestSellingProducts.filter(product => product.gender === this.selectedGender)
    }
  },
  methods: {
    goToProduct(productId) {
      this.$router.push(`/product/${productId}`)
    },
    addToCart(productId) {
      // Get cart from localStorage (managed by Header component)
      const savedCart = localStorage.getItem('ecommerce-cart')
      let cart = []
      if (savedCart) {
        try {
          cart = JSON.parse(savedCart)
        } catch (error) {
          console.error('Error loading cart from storage:', error)
          cart = []
        }
      }
      
      const product = [...popularProducts, ...bestSellingProducts].find(p => p.id === productId)
      
      if (product) {
        const existingItem = cart.find(item => item.id === productId)
        if (existingItem) {
          existingItem.quantity += 1
        } else {
          cart.push({
            ...product,
            quantity: 1
          })
        }
        localStorage.setItem('ecommerce-cart', JSON.stringify(cart))
        // Trigger cart update event
        window.dispatchEvent(new CustomEvent('cart-updated'))
      }
    },
    initCarousel() {
      // Create 6 slides with 3 cards each
      this.carouselSlides = []
      const allProducts = [...this.popularProducts, ...this.bestSellingProducts]
      
      for (let i = 0; i < 6; i++) {
        const slide = []
        for (let j = 0; j < 3; j++) {
          const productIndex = (i * 3 + j) % allProducts.length
          slide.push(allProducts[productIndex])
        }
        this.carouselSlides.push(slide)
      }
    },
    goToSlide(index) {
      this.currentSlide = index
      this.stopAutoSlide()
      this.startAutoSlide() // Restart automatic switching
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.carouselSlides.length
    },
    prevSlide() {
      this.currentSlide = this.currentSlide === 0 ? this.carouselSlides.length - 1 : this.currentSlide - 1
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide()
      }, 5000) // Switch every 5 seconds
    },
    stopAutoSlide() {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval)
        this.autoSlideInterval = null
      }
    },
    startDrag(e) {
      this.isDragging = true
      this.stopAutoSlide()
      
      if (e.type === 'mousedown') {
        this.startX = e.clientX
      } else if (e.type === 'touchstart') {
        this.startX = e.touches[0].clientX
      }
    },
    onDrag(e) {
      if (!this.isDragging) return
      
      e.preventDefault()
      
      if (e.type === 'mousemove') {
        this.currentX = e.clientX
      } else if (e.type === 'touchmove') {
        this.currentX = e.touches[0].clientX
      }
    },
    endDrag() {
      if (!this.isDragging) return

      this.isDragging = false
      const diffX = this.startX - this.currentX

      if (Math.abs(diffX) > this.dragThreshold) {
        if (diffX > 0) {
          this.nextSlide()
        } else {
          this.prevSlide()
        }
      }

      this.startAutoSlide()
    },
    filterByGender(gender) {
      this.selectedGender = gender
    },
    
    // Footer functionality
    subscribeNewsletter() {
      if (this.newsletterEmail) {
        // Here you would typically send the email to your backend
        this.showNotification('Thank you for subscribing to our newsletter!')
        this.newsletterEmail = ''
      }
    },
    
    scrollToCollection() {
      // Scroll to the "Most Popular Products" section (our collection)
      const collectionSection = document.querySelector('.trending')
      if (collectionSection) {
        collectionSection.scrollIntoView({ behavior: 'smooth' })
      }
    },
    
    showPrivacyPolicy() {
      // Simple alert for now - in a real app, this would open a modal or navigate to a privacy page
      alert('Privacy Policy:\n\nWe respect your privacy and are committed to protecting your personal data. We only collect information necessary to provide our services and will never share your data with third parties without your consent.\n\nFor more information, please contact us at privacy@slick.com')
    }
  },
  created() {
    this.initCarousel()
  },
  mounted() {
    this.startAutoSlide()
  },
  beforeUnmount() {
    this.stopAutoSlide()
  }
}
</script>

<style>
@import '../styles/home.css';
</style>