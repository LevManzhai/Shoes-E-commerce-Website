<template>
  <div class="product-page">

    <!-- Product Details -->
    <section class="product-details">
      <div class="container">
        <div class="product-content">
          <div class="product-images">
            <div class="main-image">
              <img v-if="product.image" :src="product.image" :alt="product.name" class="product-main-img">
            </div>
            <div class="thumbnail-images" v-if="productImages.length > 0">
              <img 
                v-for="(img, index) in productImages" 
                :key="index"
                :src="img" 
                :alt="product.name"
                class="thumbnail"
                @click="setMainImage(img)"
                :class="{ active: img === product.image }"
              >
            </div>
          </div>
          
          <div class="product-info sticky-element">
            <div class="breadcrumb">
              <router-link to="/">Home</router-link> / 
              <span>Shop</span> / 
              <span>{{ product.name }}</span>
            </div>
            
            <h1 class="product-title">{{ product.name }}</h1>
            
            <div class="product-rating">
              <div class="stars">★★★★☆</div>
              <span class="rating-text">(4.0 out of 5 stars)</span>
            </div>
            
            <div class="product-price">
              <span class="current-price">{{ product.currentPrice }}</span>
              <span class="original-price" v-if="product.originalPrice">{{ product.originalPrice }}</span>
              <span class="discount" v-if="product.discount">{{ product.discount }}% OFF</span>
            </div>
            
            <div class="product-description">
              <p>{{ product.description }}</p>
            </div>
            
            <div class="product-options">
              <div class="size-selection">
                <h3>Size</h3>
                <div class="size-options">
                  <button 
                    v-for="size in sizes" 
                    :key="size"
                    class="size-btn"
                    :class="{ active: selectedSize === size }"
                    @click="selectedSize = size"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>
              
              <div class="color-selection">
                <h3>Color</h3>
                <div class="color-options">
                  <button 
                    v-for="color in colors" 
                    :key="color.name"
                    class="color-btn"
                    :class="{ active: selectedColor === color.name }"
                    :style="{ backgroundColor: color.value }"
                    @click="selectedColor = color.name"
                  >
                  </button>
                </div>
              </div>
            </div>
            
            <div class="quantity-selection">
              <h3>Quantity</h3>
              <div class="quantity-controls">
                <button @click="decreaseQuantity" class="qty-btn">-</button>
                <span class="quantity">{{ quantity }}</span>
                <button @click="increaseQuantity" class="qty-btn">+</button>
              </div>
            </div>
            
            <div class="product-actions">
              <button class="btn-add-cart" @click="addToCart()">
                Add to Cart
              </button>
              <button class="btn-buy-now" @click="buyNow">
                Buy Now
              </button>
            </div>
            
            <div class="product-features">
              <div class="feature">
                <span class="feature-icon">🚚</span>
                <span>Free Shipping on orders over £99</span>
              </div>
              <div class="feature">
                <span class="feature-icon">↩️</span>
                <span>30 Day Return Policy</span>
              </div>
              <div class="feature">
                <span class="feature-icon">🔒</span>
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Products -->
    <section class="related-products">
      <div class="container">
        <h2 class="section-title">Related Products</h2>
        <div class="products-grid">
          <div 
            class="product-card" 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id"
            @click="goToProduct(relatedProduct.id)"
          >
            <img :src="relatedProduct.image" :alt="relatedProduct.name" class="product-image">
            <h4 class="product-name">{{ relatedProduct.name }}</h4>
            <div class="product-footer">
              <p class="product-price">{{ relatedProduct.currentPrice }}</p>
              <button class="add-to-cart-btn" @click.stop="addToCart(relatedProduct.id)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Notification -->
    <div v-if="notification.show" class="notification">
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import { getProductById, getRelatedProducts } from '../data/products.js'

export default {
  name: 'Product',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedSize: 'M',
      selectedColor: 'Black',
      quantity: 1,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [],
      product: {},
      productImages: [],
      relatedProducts: [],
      notification: {
        show: false,
        message: ''
      },
      newsletterEmail: '',
      privacyModal: false
    }
  },
  mounted() {
    this.loadProduct()
    this.loadRelatedProducts()
  },
  watch: {
    id() {
      this.loadProduct()
      this.loadRelatedProducts()
      // Reset selected options when navigating to new product
      this.selectedSize = 'M'
      this.selectedColor = 'Black'
      this.quantity = 1
    }
  },
  methods: {
    loadProduct() {
      this.product = getProductById(this.id)
      this.productImages = this.product.images || [this.product.image]

      // Update available sizes and colors based on new product
      if (this.product.sizes) {
        this.sizes = this.product.sizes
        this.selectedSize = this.product.sizes[0] || 'M'
      }

      if (this.product.colors) {
        this.colors = this.product.colors
        this.selectedColor = this.product.colors[0]?.name || 'Black'
      }
    },
    
    loadRelatedProducts() {
      this.relatedProducts = getRelatedProducts(this.id)
    },
    
    setMainImage(image) {
      this.product.image = image
    },
    
    increaseQuantity() {
      this.quantity++
    },
    
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    
    
    buyNow() {
      // Add to cart
      const existingItem = this.cart.find(item => item.id === this.product.id)
      if (existingItem) {
        existingItem.quantity += this.quantity
      } else {
        this.cart.push({
          ...this.product,
          quantity: this.quantity
        })
      }
      this.saveCartToStorage()
      // Reset quantity
      this.quantity = 1
      // Set flag to close cart when navigating to checkout
      localStorage.setItem('close-cart-on-checkout', 'true')
      // Navigate to checkout
      this.$router.push('/checkout')
    },
    
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
      
      // If productId is passed, this is from Related Products
      if (productId) {
        const product = this.relatedProducts.find(p => p.id === productId)
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
      } else {
        // If productId is not passed, this is the main Add to Cart button
        const existingItem = cart.find(item => item.id === this.product.id)
        if (existingItem) {
          existingItem.quantity += this.quantity
        } else {
          cart.push({
            ...this.product,
            quantity: this.quantity
          })
        }
        localStorage.setItem('ecommerce-cart', JSON.stringify(cart))
        // Trigger cart update event
        window.dispatchEvent(new CustomEvent('cart-updated'))
        // Show notification
        this.showNotification(`${this.quantity} ${this.product.name} added to cart!`)
        // Reset quantity after adding
        this.quantity = 1
      }
    },
    
    
    showNotification(message) {
      this.notification.message = message
      this.notification.show = true
      setTimeout(() => {
        this.notification.show = false
      }, 3000)
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
  }
}
</script>

<style>
@import '../styles/product.css';
</style>