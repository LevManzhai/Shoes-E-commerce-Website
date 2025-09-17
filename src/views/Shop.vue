<template>
  <div class="shop-page">

    <!-- Shop Content -->
    <div class="shop-content">
      <div class="container">
        <div class="shop-layout">
          <!-- Filters Sidebar -->
          <div class="filters-sidebar">
            <h3>Filters</h3>
            
            <!-- Gender Filter -->
            <div class="filter-group">
              <h4>Gender</h4>
              <div class="filter-options">
                <label class="filter-option">
                  <input type="radio" name="gender" value="all" v-model="selectedGender" @change="applyFilters">
                  <span class="filter-label">All</span>
                </label>
                <label class="filter-option">
                  <input type="radio" name="gender" value="women" v-model="selectedGender" @change="applyFilters">
                  <span class="filter-label">Women</span>
                </label>
                <label class="filter-option">
                  <input type="radio" name="gender" value="men" v-model="selectedGender" @change="applyFilters">
                  <span class="filter-label">Men</span>
                </label>
              </div>
            </div>

            <!-- Color Filter -->
            <div class="filter-group">
              <h4>Color</h4>
              <div class="color-filters">
                <button 
                  v-for="color in availableColors" 
                  :key="color.name"
                  :class="['color-filter', { active: selectedColors.includes(color.name), 'white-filter': color.name === 'White' }]"
                  :style="{ backgroundColor: color.value }"
                  @click="toggleColor(color.name)"
                  :title="color.name"
                ></button>
              </div>
            </div>
          </div>
          <!-- Products Grid -->
          
          <div class="products-section">
            <div class="products-header">
              <h2>Shop</h2>
              <p>{{ filteredProducts.length }} products found</p>
            </div>
            
            <div class="products-grid">
              <div 
                v-for="product in filteredProducts" 
                :key="product.id" 
                class="product-card"
                @click="goToProduct(product.id)"
              >
                <img :src="product.image" :alt="product.name" class="product-image">
                <h4 class="product-name">{{ product.name }}</h4>
                <div class="product-footer">
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
      </div>
    </div>


  </div>
</template>

<script>
import { products } from '../data/products.js'

export default {
  name: 'Shop',
  data() {
    return {
      products,
      selectedGender: 'all',
      selectedColors: [],
      newsletterEmail: '',
      privacyModal: false
    }
  },
  computed: {
    availableColors() {
      const colors = new Set()
      this.products.forEach(product => {
        if (product.color) {
          colors.add(JSON.stringify({ name: product.color, value: this.getColorValue(product.color) }))
        }
      })
      return Array.from(colors).map(color => JSON.parse(color))
    },
    filteredProducts() {
      let filtered = this.products

      // Filter by gender
      if (this.selectedGender !== 'all') {
        filtered = filtered.filter(product => product.gender === this.selectedGender)
      }

      // Filter by colors
      if (this.selectedColors.length > 0) {
        filtered = filtered.filter(product => 
          product.color && this.selectedColors.includes(product.color)
        )
      }

      return filtered
    }
  },
  methods: {
    goToProduct(productId) {
      this.$router.push(`/product/${productId}`)
    },
    addToCart(productId) {
      // Get cart from Header component via localStorage
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
      
      const product = this.products.find(p => p.id === productId)
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
        
        // Item added to cart
      }
    },
    applyFilters() {
      // This method is called when filters change
      // The computed property filteredProducts will automatically update
    },
    toggleColor(colorName) {
      const index = this.selectedColors.indexOf(colorName)
      if (index > -1) {
        this.selectedColors.splice(index, 1)
      } else {
        this.selectedColors.push(colorName)
      }
    },
    getColorValue(colorName) {
      const colorMap = {
        'Black': '#000000',
        'White': '#F5F5F5',
        'Grey': '#666666',
        'Blue': '#2196F3',
        'Brown': '#8B4513'
      }
      return colorMap[colorName] || '#CCCCCC'
    },
    
    // Footer functionality
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
  },
  created() {
    // Component initialization
  }
}
</script>

<style>
@import '../styles/shop.css';
</style>
