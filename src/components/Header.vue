<template>
  <div>
    <header class="header" ref="header">
      <div class="container">
        <div class="header-content">
          <router-link to="/" class="logo">
            <h1>Slick</h1>
          </router-link>
          
          <nav class="nav">
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/shop" class="nav-link">Shop</router-link>
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </nav>
          
          <div class="header-actions">
            <button class="header-cart-btn" @click="toggleCart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span v-if="getTotalItems() > 0" class="header-cart-count">{{ getTotalItems() }}</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Floating Cart Button -->
    <button 
      class="floating-cart-btn" 
      :class="{ 'show': showFloatingCart }"
      @click="toggleCart"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span v-if="getTotalItems() > 0" class="floating-cart-count">{{ getTotalItems() }}</span>
    </button>

    <!-- Cart Sidebar -->
    <div class="cart-overlay" :class="{ active: isCartOpen }" @click="toggleCart"></div>
    <div class="cart-sidebar" :class="{ active: isCartOpen }">
      <div class="cart-header">
        <h3>Cart ({{ getTotalItems() }})</h3>
        <button class="close-cart" @click="toggleCart">×</button>
      </div>
      <div class="cart-items">
        <div v-if="cart.length === 0" class="empty-cart">
          <p>Cart is empty</p>
        </div>
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="cart-item-image">
          <div class="cart-item-details">
            <h4>{{ item.name }}</h4>
            <p class="cart-item-price">{{ item.currentPrice || item.price }}</p>
            <div class="quantity-controls">
              <button @click="updateQuantity(item.id, -1)" class="qty-btn">-</button>
              <span class="quantity">{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, 1)" class="qty-btn">+</button>
            </div>
          </div>
          <button @click="removeFromCart(item.id)" class="remove-btn">×</button>
        </div>
      </div>
      <div class="cart-footer">
        <div class="cart-total">
          <h3>Total: £{{ getTotalPrice() }}</h3>
        </div>
        <router-link to="/checkout" class="checkout-btn" @click="closeCart">Checkout</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      cart: [],
      isCartOpen: false,
      showFloatingCart: false
    }
  },
  methods: {
    toggleCart() {
      this.isCartOpen = !this.isCartOpen
      this.$emit('toggle-cart', this.isCartOpen)
    },
    closeCart() {
      this.isCartOpen = false
      this.$emit('toggle-cart', this.isCartOpen)
    },
    getTotalItems() {
      return this.cart.reduce((total, item) => total + item.quantity, 0)
    },
    loadCartFromStorage() {
      const savedCart = localStorage.getItem('ecommerce-cart')
      if (savedCart) {
        try {
          this.cart = JSON.parse(savedCart)
        } catch (error) {
          console.error('Error loading cart from storage:', error)
          this.cart = []
        }
      }
    },
    handleScroll() {
      if (this.$refs.header) {
        const headerRect = this.$refs.header.getBoundingClientRect()
        this.showFloatingCart = headerRect.bottom < 0
      }
    },
    getTotalPrice() {
      if (!this.cart || this.cart.length === 0) {
        return '0.00'
      }
      return this.cart.reduce((total, item) => {
        const price = parseFloat((item.currentPrice || item.price || '0').replace('£', ''))
        return total + (price * item.quantity)
      }, 0).toFixed(2)
    },
    updateQuantity(itemId, change) {
      const item = this.cart.find(item => item.id === itemId)
      if (item) {
        item.quantity += change
        if (item.quantity <= 0) {
          this.removeFromCart(itemId)
        } else {
          this.saveCartToStorage()
          // Trigger cart update event
          window.dispatchEvent(new CustomEvent('cart-updated'))
        }
      }
    },
    removeFromCart(itemId) {
      this.cart = this.cart.filter(item => item.id !== itemId)
      this.saveCartToStorage()
      // Trigger cart update event
      window.dispatchEvent(new CustomEvent('cart-updated'))
    },
    saveCartToStorage() {
      localStorage.setItem('ecommerce-cart', JSON.stringify(this.cart))
    }
  },
  created() {
    this.loadCartFromStorage()
  },
  mounted() {
    // Add scroll listener
    window.addEventListener('scroll', this.handleScroll)
    
    // Listen for custom cart update events
    window.addEventListener('cart-updated', this.loadCartFromStorage)
    
    // Listen for route changes to close cart on checkout
    this.$router.afterEach((to) => {
      if (to.name === 'Checkout' && this.isCartOpen) {
        this.closeCart()
      }
      // Check for close cart flag
      if (localStorage.getItem('close-cart-on-checkout') === 'true') {
        this.closeCart()
        localStorage.removeItem('close-cart-on-checkout')
      }
    })
  },
  beforeUnmount() {
    // Remove scroll listener
    window.removeEventListener('scroll', this.handleScroll)
    
    // Remove cart update listener
    window.removeEventListener('cart-updated', this.loadCartFromStorage)
  }
}
</script>

<style scoped>
@import '../styles/header.css';
</style>
