# 🎓 Cubico Technologies — Website

**From Chalk-and-Board to World-Class**

A modern, dark-themed SaaS website for Cubico Technologies — a full-stack EdTech agency serving schools across Pakistan, Saudi Arabia & Canada. Built with Next.js 14, Tailwind CSS, Framer Motion, and Supabase.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Supabase** | Database (PostgreSQL) + Auth |
| **Lucide React** | Icon library |

---

## 🚀 Deployment Guide (Step by Step)

### Step 1: Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **"New Project"** — name it `cubico-website`
3. Choose a strong database password and your nearest region
4. Once the project is created, go to **SQL Editor** (left sidebar)
5. Copy the entire contents of `supabase-setup.sql` and paste it in the SQL editor
6. Click **"Run"** — this creates the `demo_requests` and `newsletter_signups` tables
7. Go to **Settings > API** and copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key

### Step 2: GitHub Setup

1. Create a new GitHub repository (e.g., `cubico-website`)
2. In your terminal:

```bash
cd cubico-website
git init
git add .
git commit -m "Initial commit — Cubico Technologies website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cubico-website.git
git push -u origin main
```

### Step 3: Vercel Deployment

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New" > "Project"**
3. Import your `cubico-website` repository
4. In the **Environment Variables** section, add:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

5. Click **"Deploy"** — Vercel will build and deploy automatically
6. Your site will be live at `https://cubico-website.vercel.app` (or your custom domain)

### Step 4: Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings > Domains**
2. Add your domain (e.g., `cubicotechnologies.com`)
3. Update your DNS records as instructed by Vercel

---

## 📁 Project Structure

```
cubico-website/
├── app/
│   ├── globals.css          # Global styles, animations, theme
│   ├── layout.tsx           # Root layout with metadata + fonts
│   └── page.tsx             # Homepage (all sections)
├── components/              # (Future: break page.tsx into components)
├── lib/
│   └── supabase.ts          # Supabase client + TypeScript types
├── public/                  # Static assets (images, favicon)
├── .env.local.example       # Environment variables template
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── supabase-setup.sql       # Database setup script
├── tailwind.config.js
└── tsconfig.json
```

---

## 🏗 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create env file
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Run dev server
npm run dev

# 4. Open http://localhost:3000
```

---

## 📋 Homepage Sections

1. **Header** — Sticky nav with glass effect, mobile responsive
2. **Hero** — Animated headline, CTA buttons, dashboard mockup
3. **Feature Cards** — Smart LMS, Animated Lessons, School ERP
4. **About** — Who We Are with target customer grid
5. **Stats** — Animated counters (760+ institutions, 3 countries, etc.)
6. **Services Grid** — 8 services with icons
7. **Contact/Demo Form** — Connected to Supabase `demo_requests` table
8. **Testimonials** — 3-column review cards
9. **FAQ** — Accordion with smooth animations
10. **Partner Logos** — Trust bar
11. **Footer** — 4-column with newsletter signup (Supabase connected)

---

## 🎨 Design System

- **Theme**: Dark SaaS (inspired by Xtechious template)
- **Primary**: `#6C3AED` (Purple)
- **Accent**: `#00D4FF` (Cyan)
- **Fonts**: Clash Display (headings) + General Sans (body) via Fontshare
- **Cards**: Glass morphism with purple glow
- **Animations**: Framer Motion fade-up, stagger, float

---

## 📝 Next Steps (Future Pages)

- [ ] About Us page
- [ ] Individual Service pages
- [ ] Case Studies / Portfolio
- [ ] Blog with CMS
- [ ] Pricing page
- [ ] Admin dashboard for managing demo requests

---

Built with ❤️ by **Cubico Technologies** — Karachi, Pakistan
