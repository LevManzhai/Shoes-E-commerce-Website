<template>
  <div class="checkout-page">

    <!-- Checkout Content -->
    <div class="checkout-content">
      <div class="container">
        <div class="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your order securely</p>
        </div>

        <div class="checkout-layout">
          <!-- Order Form -->
          <div class="order-form-section">
            <div class="form-step active">
              <h2>1. Shipping Information</h2>
              <form @submit.prevent="nextStep" class="checkout-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      v-model="shippingInfo.firstName" 
                      required
                      placeholder="Enter your first name"
                    >
                  </div>
                  <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      v-model="shippingInfo.lastName" 
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
                    v-model="shippingInfo.email" 
                    required
                    placeholder="Enter your email address"
                  >
                </div>
                
                <div class="form-group">
                  <label for="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="shippingInfo.phone" 
                    required
                    placeholder="Enter your phone number"
                  >
                </div>
                
                <div class="form-group">
                  <label for="address">Street Address *</label>
                  <input 
                    type="text" 
                    id="address" 
                    v-model="shippingInfo.address" 
                    required
                    placeholder="Enter your street address"
                  >
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="city">City *</label>
                    <input 
                      type="text" 
                      id="city" 
                      v-model="shippingInfo.city" 
                      required
                      placeholder="Enter your city"
                    >
                  </div>
                  <div class="form-group">
                    <label for="postcode">Postcode *</label>
                    <input 
                      type="text" 
                      id="postcode" 
                      v-model="shippingInfo.postcode" 
                      required
                      placeholder="Enter your postcode"
                    >
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="country">Country *</label>
                  <select id="country" v-model="shippingInfo.country" required>
                    <option value="">Select your country</option>
                    <option value="UK">United Kingdom</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="IT">Italy</option>
                    <option value="ES">Spain</option>
                  </select>
                </div>
                
                <button type="submit" class="next-btn">Continue to Payment</button>
              </form>
            </div>

            <div class="form-step" :class="{ active: currentStep === 2 }">
              <h2>2. Payment Information</h2>
              <form @submit.prevent="nextStep" class="checkout-form">
                <div class="form-group">
                  <label for="cardNumber">Card Number *</label>
                  <input 
                    type="text" 
                    id="cardNumber" 
                    v-model="paymentInfo.cardNumber" 
                    required
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                  >
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="expiryDate">Expiry Date *</label>
                    <input 
                      type="text" 
                      id="expiryDate" 
                      v-model="paymentInfo.expiryDate" 
                      required
                      placeholder="MM/YY"
                      maxlength="5"
                    >
                  </div>
                  <div class="form-group">
                    <label for="cvv">CVV *</label>
                    <input 
                      type="text" 
                      id="cvv" 
                      v-model="paymentInfo.cvv" 
                      required
                      placeholder="123"
                      maxlength="4"
                    >
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="cardName">Name on Card *</label>
                  <input 
                    type="text" 
                    id="cardName" 
                    v-model="paymentInfo.cardName" 
                    required
                    placeholder="Enter name as it appears on card"
                  >
                </div>
                
                <div class="form-actions">
                  <button type="button" @click="prevStep" class="back-btn">Back to Shipping</button>
                  <button type="submit" class="next-btn">Review Order</button>
                </div>
              </form>
            </div>

            <div class="form-step" :class="{ active: currentStep === 3 }">
              <h2>3. Review & Confirm</h2>
              <div class="review-section">
                <div class="shipping-review">
                  <h3>Shipping Address</h3>
                  <p>{{ shippingInfo.firstName }} {{ shippingInfo.lastName }}</p>
                  <p>{{ shippingInfo.address }}</p>
                  <p>{{ shippingInfo.city }}, {{ shippingInfo.postcode }}</p>
                  <p>{{ shippingInfo.country }}</p>
                </div>
                
                <div class="payment-review">
                  <h3>Payment Method</h3>
                  <p>**** **** **** {{ paymentInfo.cardNumber.slice(-4) }}</p>
                  <p>Expires: {{ paymentInfo.expiryDate }}</p>
                </div>
              </div>
              
              <div class="form-actions">
                <button type="button" @click="prevStep" class="back-btn">Back to Payment</button>
                <button @click="placeOrder" class="place-order-btn" :disabled="isProcessing">
                  {{ isProcessing ? 'Processing...' : 'Place Order' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="order-summary">
            <h2>Order Summary</h2>
            
            <div class="order-items">
              <div v-for="item in cart" :key="item.id" class="order-item">
                <img :src="item.image" :alt="item.name" class="order-item-image">
                <div class="order-item-details">
                  <h4>{{ item.name }}</h4>
                  <p class="order-item-price">{{ item.currentPrice || item.price }}</p>
                  <p class="order-item-qty">Qty: {{ item.quantity }}</p>
                </div>
              </div>
            </div>
            
            <div class="order-totals">
              <div class="total-line">
                <span>Subtotal:</span>
                <span>£{{ getSubtotal() }}</span>
              </div>
              <div class="total-line">
                <span>Shipping:</span>
                <span>£{{ getShipping() }}</span>
              </div>
              <div class="total-line">
                <span>Tax:</span>
                <span>£{{ getTax() }}</span>
              </div>
              <div class="total-line total">
                <span>Total:</span>
                <span>£{{ getTotal() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="orderPlaced" class="success-modal">
      <div class="success-content">
        <div class="success-icon">✅</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your order. We'll send you a confirmation email shortly.</p>
        <p>Order #{{ orderNumber }}</p>
        <router-link to="/shop" class="continue-shopping-btn">Continue Shopping</router-link>
      </div>
    </div>

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
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'Checkout',
  data() {
    return {
      isCartOpen: false,
      cart: [],
      currentStep: 1,
      isProcessing: false,
      orderPlaced: false,
      orderNumber: '',
      shippingInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postcode: '',
        country: ''
      },
      paymentInfo: {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
      },
      newsletterEmail: '',
      privacyModal: false
    }
  },
  methods: {
    toggleCart() {
      this.isCartOpen = !this.isCartOpen
    },
    getTotalPrice() {
      return this.cart.reduce((total, item) => {
        const priceString = item.currentPrice || item.price || '0'
        const price = parseFloat(priceString.replace('£', ''))
        return total + (price * item.quantity)
      }, 0).toFixed(2)
    },
    getTotalItems() {
      return this.cart.reduce((total, item) => total + item.quantity, 0)
    },
    getSubtotal() {
      return this.getTotalPrice()
    },
    getShipping() {
      return '5.99'
    },
    getTax() {
      const subtotal = parseFloat(this.getSubtotal())
      return (subtotal * 0.2).toFixed(2) // 20% VAT
    },
    getTotal() {
      const subtotal = parseFloat(this.getSubtotal())
      const shipping = parseFloat(this.getShipping())
      const tax = parseFloat(this.getTax())
      return (subtotal + shipping + tax).toFixed(2)
    },
    nextStep() {
      if (this.currentStep < 3) {
        this.currentStep++
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    async placeOrder() {
      this.isProcessing = true
      
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      this.orderNumber = 'SLK' + Math.random().toString(36).substr(2, 9).toUpperCase()
      this.orderPlaced = true
      this.isProcessing = false
      
      // Clear cart
      this.cart = []
      this.saveCartToStorage()
    },
    saveCartToStorage() {
      localStorage.setItem('ecommerce-cart', JSON.stringify(this.cart))
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
    }
  },
  created() {
    this.loadCartFromStorage()
  },
}
</script>

<style>
@import '../styles/checkout.css';
</style>
