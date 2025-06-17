# Stage 1: Project setup

```
npx create-next-app@latest my-ecommerce-store
```

1. Creating the Nextjs floder
2. Setup the files 


```
npm run dev
```

3. Link with the github

```
git clone https://github.com/SimpleCyber/Product-CatLog.git
```

4. Connecting with the vercel for the continous lookout

```
url : https://product-cat-log.vercel.app/
```

5. Configure the Tailwind and demo page

```
npm install -D tailwindcss postcss autoprefixer --legacy-peer-deps
```
update the tailwind config
upadate the postcss.config.js

6. Setup sucessfull


### Real Project begins

# Satge 2 : Component Header
 => Navigate to home page {Project name and logo} ✅
 => Search bar ✅
 => display cart ✅
 => toggle day and night


1. For icons and animations
```
npm install lucide-react framer-motion
```
2. Search bar , display cart  with counter


# Stage 2.1 : Add the custom css (update globals.css)

1. add the shadcn components for the ui
    ```
     npx shadcn@latest init
     npx shadcn@latest add button input badge sheet
    ```


# Stage 3 : Rendering the product card

1. basic card stucture
2. Filling the details 
3. Fetiching the card using the context
4. Adding the pagination using the load more

# Stage 4 : Details section for the products

1. opening the products directly  => to its specific id only  [id]
2. display the big image
3. showcse the other details
4. add to cart
5. Show reviews
6. disply 3 more product card of same category

# Stage 5 : filters

1. filter by category already given , 
   ```
   https://dummyjson.com/products/category
   ```

   just trimmed to 10

2. price range setter by the slider
3. short the products by the rating ⭐


# Stage 6 : Search bar

1. Search by the items name 
     ❌ Auto complete remaining
2. Suggestions while writing => this increases the number of api calls

# Stage 7 : Shoping cart

1. Data saved in local storage
2. on click of the cart render the from the side (right)
3. display the prducts
4. increse the number of items 
5. delete items
6. total sum
7. Checkout ❌


# Stage 8 : Have the 2 ways to views the product 

1. old : grid
2. new : list
   



# Used the Claude AI : 
- For better tailwind styling
- For project structure designs
- Solving errors

# Refrences 
- Documentaion Tailwind setup in nextjs
- Stackoverflow
- Old codes

# Deployment 
- Vercel ==> link  : https://product-cat-log.vercel.app
