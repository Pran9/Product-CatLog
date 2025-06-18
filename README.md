# E-Commerce Product Catalog

A modern e-commerce product catalog built with Next.js, Tailwind CSS, and ShadCN UI components. This application features product listings, search functionality, filtering, cart management, and responsive design.

<div>
  <img src="https://res.cloudinary.com/djpcpmrjd/image/upload/v1750243436/uploads/Product-catlog-home.jpg.png" alt="Home Page" width="30%" />
  <img src="https://res.cloudinary.com/djpcpmrjd/image/upload/v1750243578/uploads/product-callog-details.jpg.png" alt="Product Details" width="30%" />
  <img src="https://res.cloudinary.com/djpcpmrjd/image/upload/v1750243601/uploads/product-catlog-addtocart.jpg.png" alt="Shopping Cart" width="30%" />
</div>

## Live Demo

[https://product-cat-log.vercel.app](https://product-cat-log.vercel.app)

## Features

- **Product Catalog**: Grid and list view options
- **Product Details**: Comprehensive product information page
- **Search**: Real-time product search functionality
- **Filters**: Category, price range, and rating filters
- **Shopping Cart**: Persistent cart using local storage
- **Responsive Design**: Works on all device sizes
- **Dark/Light Mode**: Toggleable theme

## Technologies Used

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI Components
- Framer Motion (Animations)
- Lucide React (Icons)
- DummyJSON API (Mock data)

## Project Structure

```bash
simplecyber-product-catlog/
├── components/               # Reusable UI components
│   ├── cart-sidebar.tsx
│   ├── filter-sidebar.tsx
│   ├── header.tsx
│   ├── product-card.tsx
│   ├── product-catalog.tsx
│   ├── product-detail.tsx
│   ├── theme-provider.tsx
│   └── ui/                  # ShadCN UI components
├── contexts/                # Global state management
│   ├── cart-context.tsx
│   └── filter-context.tsx
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
└── src/app/                 # Next.js App Router
    ├── globals.css
    ├── layout.tsx
    ├── page.tsx
    └── product/[id]/        # Dynamic product pages
```

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SimpleCyber/Product-CatLog.git
cd Product-CatLog
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Setup Configuration

### Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### ShadCN UI Components
```bash
npx shadcn@latest init
npx shadcn@latest add button input badge sheet card slider
```

### Additional Dependencies
```bash
npm install lucide-react framer-motion
```

## Development Process

**Stage 1: Project Setup**
- ✅ Next.js project initialization
- ✅ Tailwind CSS configuration
- ✅ GitHub repository setup
- ✅ Vercel deployment

**Stage 2: Header Component**
- ✅ Navigation with logo
- ✅ Search bar functionality
- ✅ Cart display with counter
- ✅ Dark/light mode toggle

**Stage 3: Product Catalog**
- ✅ Product card design
- ✅ API data fetching
- ✅ Pagination with load more
- ✅ Grid/list view options

**Stage 4: Product Details**
- ✅ Dynamic routing [id]
- ✅ Product information display
- ✅ Add to cart functionality
- ✅ Related products section

**Stage 5: Filtering System**
- ✅ Category filters
- ✅ Price range slider
- ✅ Rating-based sorting

**Stage 6: Search**
- ✅ Real-time product search
- ⏳ Auto-complete (in progress)

**Stage 7: Shopping Cart**
- ✅ Local storage persistence
- ✅ Cart sidebar panel
- ✅ Quantity management
- ✅ Total calculation

**Stage 8: View Options**
- ✅ Grid and list layouts

## Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- DummyJSON for mock product data
- ShadCN for UI components
- Claude AI for better tailwind styling and debugging
