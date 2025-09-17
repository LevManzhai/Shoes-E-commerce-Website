// Product data for Slick e-commerce store
import { getAssetPath } from '../utils/assets.js'

export const products = [
  {
    id: '1',
    name: 'Formal Canvas Men',
    currentPrice: '£29.99',
    originalPrice: '£49.99',
    discount: '40',
    image: getAssetPath('assets/images/shoes/shoes-1.png'),
    description: 'Elegant formal shoes perfect for business and special occasions. Premium leather construction with modern design.',
    images: [
      getAssetPath('assets/images/shoes/shoes-1.png'),
      getAssetPath('assets/images/shoes/shoes-2.png'),
      getAssetPath('assets/images/shoes/shoes-3.png')
    ],
    category: 'men',
    gender: 'men',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', value: '#000' },
    ]
  },
  {
    id: '2',
    name: 'Grey Yellow Sneakers',
    currentPrice: '£39.99',
    originalPrice: '£59.99',
    discount: '33',
    image: getAssetPath('assets/images/shoes/shoes-2.png'),
    description: 'Comfortable running shoes with canvas upper. Lightweight and breathable design perfect for active lifestyle.',
    images: [
      getAssetPath('assets/images/shoes/shoes-2.png'),
      getAssetPath('assets/images/shoes/shoes-4.png'),
      getAssetPath('assets/images/shoes/shoes-5.png')
    ],
    category: 'women',
    gender: 'women',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Grey', value: '#666' }
    ]
  },
  {
    id: '3',
    name: 'Slick Sneakers',
    currentPrice: '£59.99',
    originalPrice: '£79.99',
    discount: '25',
    image: getAssetPath('assets/images/shoes/shoes-3.png'),
    description: 'Modern sneakers with sleek design and superior comfort. Perfect for urban lifestyle and casual wear.',
    images: [
      getAssetPath('assets/images/shoes/shoes-3.png'),
      getAssetPath('assets/images/shoes/shoes-1.png'),
      getAssetPath('assets/images/shoes/shoes-6.png')
    ],
    category: 'men',
    gender: 'men',
    color: 'White',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', value: '#fff' }
    ]
  },
  {
    id: '4',
    name: 'Slick Running Shoes',
    currentPrice: '£29.99',
    originalPrice: '£49.99',
    discount: '40',
    image: getAssetPath('assets/images/shoes/shoes-4.png'),
    description: 'High-performance running shoes designed for comfort and durability. Perfect for athletes and fitness enthusiasts.',
    images: [
      getAssetPath('assets/images/shoes/shoes-4.png'),
      getAssetPath('assets/images/shoes/shoes-4.png'),
      getAssetPath('assets/images/shoes/shoes-4.png')
    ],
    category: 'women',
    gender: 'women',
    color: 'Blue',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blue', value: '#2196f3' }
    ]
  },
  {
    id: '5',
    name: 'Formal Canvas Shoes',
    currentPrice: '£39.99',
    originalPrice: '£59.99',
    discount: '33',
    image: getAssetPath('assets/images/shoes/shoes-5.png'),
    description: 'Classic formal shoes with canvas construction. Versatile design suitable for both business and casual occasions.',
    images: [
      getAssetPath('assets/images/shoes/shoes-5.png'),
      getAssetPath('assets/images/shoes/shoes-5.png'),
      getAssetPath('assets/images/shoes/shoes-5.png')
    ],
    category: 'women',
    gender: 'women',
    color: 'Grey',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Grey', value: '#666' }
    ]
  },
  {
    id: '6',
    name: 'Formal Slick Shoe',
    currentPrice: '£59.99',
    originalPrice: '£79.99',
    discount: '25',
    image: getAssetPath('assets/images/shoes/shoes-6.png'),
    description: 'Premium formal shoes with distinctive striped design. Perfect for making a statement at special events.',
    images: [
      getAssetPath('assets/images/shoes/shoes-6.png'),
      getAssetPath('assets/images/shoes/shoes-6.png'),
      getAssetPath('assets/images/shoes/shoes-6.png')
    ],
    category: 'men',
    gender: 'men',
    color: 'Grey',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Grey', value: '#666' }
    ]
  }
]

// Popular products for home page
export const popularProducts = [
  {
    id: '1',
    name: 'Black Running Canvas',
    currentPrice: '£29.99',
    image: getAssetPath('assets/images/shoes/shoes-1.png')
  },
  {
    id: '2',
    name: 'Grey Running Casual',
    currentPrice: '£39.99',
    image: getAssetPath('assets/images/shoes/shoes-2.png')
  },
  {
    id: '3',
    name: 'Nike Casual',
    currentPrice: '£59.99',
    image: getAssetPath('assets/images/shoes/shoes-3.png')
  }
]

// Best selling products for home page
export const bestSellingProducts = products.slice(0, 6)

// Related products for product page
export const getRelatedProducts = (currentProductId) => {
  return products.filter(product => product.id !== currentProductId).slice(0, 4)
}

// Get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === id)
}
