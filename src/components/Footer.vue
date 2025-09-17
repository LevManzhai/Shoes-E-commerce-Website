<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-left">
          <h3 class="footer-logo">Slick</h3>
          <p>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.</p>
          <div class="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
        <div class="footer-center">
          <h4>Subscribe to our news letter</h4>
          <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter Email..." 
              class="email-input"
              v-model="newsletterEmail"
              required
            >
            <button type="submit" class="subscribe-btn">Subscribe</button>
          </form>
        </div>
        <div class="footer-right">
          <h4>Quick Link's</h4>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/shop">Shop</router-link></li>
            <li><a href="#" @click="scrollToCollection">Collection</a></li>
            <li><router-link to="/contact">Contact</router-link></li>
            <li><a href="#" @click="showPrivacyPolicy">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>slick.com/allrightsreserve</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      newsletterEmail: '',
      privacyModal: false
    }
  },
  methods: {
    subscribeNewsletter() {
      if (this.newsletterEmail) {
        // Here you would typically send the email to your backend
        alert('Thank you for subscribing to our newsletter!')
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
  }
}
</script>

<style scoped>
@import '../styles/footer.css';
</style>


