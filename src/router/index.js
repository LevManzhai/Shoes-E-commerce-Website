import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Shop from '../views/Shop.vue'
import Contact from '../views/Contact.vue'
import Checkout from '../views/Checkout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory('/Shoes-E-commerce-Website/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top of page on navigation
    return { top: 0 }
  }
})

// Handle redirect from 404.html
router.beforeEach((to, from, next) => {
  const redirectPath = sessionStorage.getItem('redirectPath')
  if (redirectPath && to.path === '/') {
    sessionStorage.removeItem('redirectPath')
    next(redirectPath)
  } else {
    next()
  }
})

export default router
