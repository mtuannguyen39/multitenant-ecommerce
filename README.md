# 🛒 Multitenant E-commerce Platform

A multi-tenant e-commerce web application built with [Next.js](https://nextjs.org), [Payload CMS](https://payloadcms.com), and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). It supports multiple independent stores with isolated products and Stripe-based payment.

**Live Demo:** [https://multitenant-ecommerce-zeta.vercel.app](https://multitenant-ecommerce-zeta.vercel.app)  
**GitHub:** [github.com/mtuannguyen39/multitenant-ecommerce](https://github.com/mtuannguyen39/multitenant-ecommerce)

---

## 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Radix UI
- **Backend:** Payload CMS (headless CMS, authentication, REST & GraphQL APIs)
- **Database:** MongoDB Atlas
- **Payments:** Stripe (Checkout & Connect)
- **Deployment:** Vercel (Frontend) & Payload Server (Local)

---

## 🔑 Key Features

- Multi-tenant architecture (separate store per user)
- Role-based access control (User & Super Admin)
- Stripe onboarding and payment integration
- Product & media management with Payload CMS
- Tenant-specific subdomains & product isolation
- Responsive design with Tailwind + Radix UI

---

## 🧑‍💻 Getting Started

1. **Clone the repository**
git clone https://github.com/mtuannguyen39/multitenant-ecommerce.git

```bash 
cd multitenant-ecommerce
```


3. **Install dependencies**

```bash
bun install
```

4. **Set up environment variables**

Create a .env file based on .env.example, and fill your MongoDB, Stripe, and Payload credentials.

6. **Run the app**

```bash
bun run dev
```

Visit (http://localhost:3000) in your browser.

## Preview
### 🏠 Home Page
![Home Page Preview](/public/home.png)

### 📘 Product Detail
![Product Detail Preview](/public/detail.png)

### 🛒 Checkout
![Checkout Preview](/public/checkout.png)

### 🧑‍💼 Seller Page
![Tenant Page Preview](/public/tenant.png)

### 🛠 Admin Dashboard
![Admin Dashboard Preview](/public/admin.png)
