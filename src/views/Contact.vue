<template>
  <div class="contact-page">

    <!-- Contact Content -->
    <div class="contact-content">
      <div class="container">
        <div class="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div class="contact-layout">
          <!-- Contact Information -->
          <div class="contact-info">
            <h2>Get in Touch</h2>
            <p>Visit our flagship store in the heart of London or reach out to us through any of the channels below.</p>
            
            <div class="contact-details">
              <div class="contact-item">
                <div class="contact-icon">📍</div>
                <div class="contact-text">
                  <h3>Address</h3>
                  <p>123 Oxford Street<br>London W1D 2HX<br>United Kingdom</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">📞</div>
                <div class="contact-text">
                  <h3>Phone</h3>
                  <p><a href="tel:+442071234567" class="phone-link">+44 20 7123 4567</a></p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">✉️</div>
                <div class="contact-text">
                  <h3>Email</h3>
                  <p><a href="mailto:hello@slick.com" class="email-link">hello@slick.com</a></p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">🕒</div>
                <div class="contact-text">
                  <h3>Opening Hours</h3>
                  <p>Mon - Fri: 9:00 AM - 8:00 PM<br>Sat - Sun: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="contact-form-section">
            <h2>Send us a Message</h2>
            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">First Name *</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    v-model="form.firstName" 
                    required
                    placeholder="Enter your first name"
                  >
                </div>
                <div class="form-group">
                  <label for="lastName">Last Name *</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    v-model="form.lastName" 
                    required
                    placeholder="Enter your last name"
                  >
                </div>
              </div>
              
              <div class="form-group">
                <label for="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required
                  placeholder="Enter your email address"
                >
              </div>
              
              <div class="form-group">
                <label for="message">Message *</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  required
                  rows="5"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              
              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
            
            <div v-if="formSubmitted" class="success-message">
              <h3>Thank you!</h3>
              <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      },
      isSubmitting: false,
      formSubmitted: false
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      this.formSubmitted = true
      this.isSubmitting = false
      
      // Reset form
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      }
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        this.formSubmitted = false
      }, 5000)
    }
  }
}
</script>

<style>
@import '../styles/contact.css';
</style>
