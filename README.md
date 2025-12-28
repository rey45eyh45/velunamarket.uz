# Veluna Market - Professional E-Commerce Platform

## 🛒 Loyiha haqida

Veluna Market - bu zamonaviy texnologiyalarda qurilgan to'liq funksional e-commerce platformasi.

## 🚀 Texnologiyalar

- **Frontend Framework**: Next.js 16 (App Router)
- **Til**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Authentication
- **State Management**: Zustand
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 📁 Loyiha Strukturasi

```
veluna-next/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Bosh sahifa
│   ├── loading.tsx        # Yuklanish holati
│   ├── error.tsx          # Xato sahifasi
│   ├── not-found.tsx      # 404 sahifa
│   ├── globals.css        # Global stillar
│   ├── products/          # Mahsulotlar sahifalari
│   ├── categories/        # Kategoriyalar sahifasi
│   ├── cart/              # Savat sahifasi
│   ├── checkout/          # To'lov sahifasi
│   ├── profile/           # Foydalanuvchi profili
│   └── auth/              # Autentifikatsiya
│       ├── login/         # Kirish
│       └── register/      # Ro'yxatdan o'tish
├── components/            # React komponentlar
│   ├── ui/               # UI komponentlar (Button, Input, Badge, Loading)
│   ├── layout/           # Layout komponentlar (Header, Footer)
│   ├── products/         # Mahsulot komponentlar
│   └── cart/             # Savat komponentlar
├── lib/                  # Yordamchi kutubxonalar
│   ├── supabase/         # Supabase client
│   └── utils.ts          # Utility funksiyalar
├── services/             # API servislari
│   ├── products.ts       # Mahsulot operatsiyalari
│   ├── orders.ts         # Buyurtma operatsiyalari
│   ├── auth.ts           # Autentifikatsiya
│   └── banners.ts        # Banner operatsiyalari
├── store/                # Zustand store'lar
│   ├── cart.ts           # Savat holati
│   └── auth.ts           # Auth holati
├── types/                # TypeScript tiplar
├── supabase/             # Supabase fayllari
│   └── schema.sql        # Database schema
├── .env.example          # Environment namunasi
├── .env.local            # Lokal environment (gitignore)
└── package.json          # Paketlar
```

## 🔧 O'rnatish

### 1. Paketlarni o'rnatish

```bash
cd veluna-next
npm install
```

### 2. Supabase sozlash

1. [supabase.com](https://supabase.com) da yangi loyiha yarating
2. `supabase/schema.sql` faylidagi SQL ni Supabase SQL Editor'da bajaring
3. `.env.local` faylini yarating:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Development serverni ishga tushirish

```bash
npm run dev
```

Sayt `http://localhost:3000` da ochiladi.

## 📦 Build & Deploy

### Production build

```bash
npm run build
npm start
```

### Vercel bilan deploy

```bash
npx vercel
```

## 🗄️ Database Schema

Loyiha quyidagi jadvallardan foydalanadi:

- **users** - Foydalanuvchilar profillari
- **categories** - Mahsulot kategoriyalari
- **products** - Mahsulotlar
- **cart_items** - Savat elementlari
- **orders** - Buyurtmalar
- **order_items** - Buyurtma tafsilotlari
- **banners** - Reklama bannerlari

## 🔐 Autentifikatsiya

- Email/Password orqali ro'yxatdan o'tish
- Email/Password orqali kirish
- Row Level Security (RLS) bilan himoyalangan

## ✨ Xususiyatlar

- ✅ Responsive dizayn (Mobile-first)
- ✅ Dark/Light mode
- ✅ Server-Side Rendering (SSR)
- ✅ Static Site Generation (SSG)
- ✅ SEO optimizatsiya
- ✅ Lazy loading images
- ✅ Cart persistence (localStorage)
- ✅ Supabase realtime
- ✅ TypeScript strict mode
- ✅ Error boundaries

## 📝 API Yo'llari

### Sahifalar

| Yo'l | Tavsif |
|------|--------|
| `/` | Bosh sahifa |
| `/products` | Barcha mahsulotlar |
| `/products/[slug]` | Mahsulot tafsilotlari |
| `/categories` | Kategoriyalar |
| `/cart` | Savat |
| `/checkout` | To'lov |
| `/profile` | Shaxsiy kabinet |
| `/auth/login` | Kirish |
| `/auth/register` | Ro'yxatdan o'tish |

## 🛠️ Development

### TypeScript tekshirish

```bash
npx tsc --noEmit
```

### Lint

```bash
npm run lint
```

## 📄 Litsenziya

MIT License

---

**Veluna Market** - Professional E-Commerce Solution
