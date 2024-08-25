# CookieGram

## Description
Delivery+ is a delivery application designed to streamline the package selection, pricing, and delivery process.

## Features
* **Package Selection:** Choose from multiple package sizes and delivery options based on user needs.
* **Distance Price Calculation:** Automatic price calculation based on delivery distance and package type.
* **Interactive Route Visualization:** Real-time route mapping and address visualization using Mapbox, displaying over 100+ routes.
* **Secure Payment Processing:** Integrated with Stripe to handle payments securely, managing over 200 transactions efficiently.

<p>
  <img src="https://github.com/Fahmid-Abdullah/delivery-app/blob/d0edc5bfdb19fdcf03238fb38d1cb0691c4f0453/demo%20gifs/address_input.gif" alt="Landing Page" width="300" style="display: inline-block; margin-right: 10px;">
  <img src="https://github.com/Fahmid-Abdullah/delivery-app/blob/d0edc5bfdb19fdcf03238fb38d1cb0691c4f0453/demo%20gifs/stripe.gif" alt="Home Page" width="300" style="display: inline-block; margin-right: 10px;">
</p>


## Tech Stack
* **Frontend:** Next.js, Tailwind CSS
* **Backend:** Node.js
* **Authentication:** Clerk
* **Mapping and Visualization:** Mapbox
* **Payment Processing:** Stripe
* **Deployment:** Vercel

## How to Run
You can check out the app via the Vercel link in the bio. If you'd like to run it locally, follow the instructions below:


Clone the repository:

```bash
git clone https://github.com/Fahmid-Abdullah/delivery-app.git
cd your-repo
```

Install dependencies:

```bash
npm install
```

Create a .env.local file in the root directory with the following (Set up environment variables):
```bash
STRIPE_SECRET_KEY=<your_stripe_key>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=<your_mongodb_uri>
MAPBOX_ACCESS_TOKEN=<your_mapbox_access_token>
NEXT_PUBLIC_IMGUR_CLIENT_ID=<your_public_imgur_client_id>
NEXT_PUBLIC_CLERK_FRONTEND_API=<your_clerk_frontend_api>
CLERK_API_KEY=<your_clerk_api_key>
CLERK_SECRET_KEY=<your_cler_secret_key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
```

Run the development server:

```bash
npm run dev
```

Open the app in your browser:

```bash
http://localhost:3000
```
