# Slick Shoes E-commerce Website

Modern shoe e-commerce website built with Vue.js and routing.

## Features

- 🎨 Modern design that closely follows the mockup
- 🛒 Fully functional shopping cart
- 🔍 Detailed product pages
- 📱 Responsive design
- ⚡ Fast navigation with Vue Router
- 🖼️ Ready for product image loading

## Project Structure

```
e-commerce/
├── src/
│   ├── components/          # Reusable components
│   ├── views/              # Application pages
│   │   ├── Home.vue        # Home page
│   │   └── Product.vue     # Product page
│   ├── router/             # Routing configuration
│   │   └── index.js
│   ├── assets/
│   │   └── images/
│   │       └── shoes/      # Folder for product images
│   ├── App.vue
│   └── main.js
├── public/                 # Static files
├── package.json
├── vite.config.js
└── index.html
```

## Installation and Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open browser at: `http://localhost:3000`

## Loading Product Images

Upload product images to `/src/assets/images/shoes/` folder with the following names:

- `shoes-1.png` - First product
- `shoes-2.png` - Second product
- `shoes-3.png` - Third product
- `shoes-4.png` - Fourth product
- `shoes-5.png` - Fifth product
- `shoes-6.png` - Sixth product

## Routing

- `/` - Home page
- `/product/:id` - Product page (where :id is product ID from 1 to 6)

## Functionality

### Home Page
- Hero section with call to action
- Popular products section
- Best selling section
- Customer testimonials
- Newsletter subscription

### Product Page
- Detailed product information
- Size and color selection
- Quantity selection
- Related products
- Add to cart functionality

## Technologies

- Vue.js 3
- Vue Router 4
- Vite
- CSS3 (Flexbox, Grid)
- JavaScript ES6+

## Responsiveness

The website is fully responsive and displays correctly on:
- Desktops (1200px+)
- Tablets (768px - 1199px)
- Mobile devices (up to 767px)