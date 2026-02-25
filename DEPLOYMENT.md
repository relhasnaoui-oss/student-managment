# Deployment Guide - Student Management System

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+ 
- npm 9+
- Git

### 2. Setup

```bash
# Clone the repository
git clone https://github.com/relhasnaoui-oss/student-managment.git
cd student-managment

# Install dependencies
npm install

# Seed the database with sample data
npm run seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Default Login
- **Email**: admin@example.com
- **Password**: admin123

---

## Vercel Deployment

### 1. Prepare for Deployment

The project is already Vercel-compatible with:
- `vercel.json` configuration
- Environment variables configured
- API routes ready for serverless

### 2. Deploy Steps

**Option A: Via Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Select GitHub repository: `relhasnaoui-oss/student-managment`
4. Configure environment variables:
   ```
   NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
   NEXTAUTH_URL=https://<your-vercel-domain>.vercel.app
   ```
5. Click "Deploy"

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 3. Environment Variables

Set these in Vercel Project Settings → Environment Variables:

```
NEXTAUTH_SECRET=<random-key-generated-locally>
NEXTAUTH_URL=https://your-domain.vercel.app
```

### 4. Database Persistence (Optional)

For production, consider:
- Using Vercel KV for session storage
- Using a cloud database (PostgreSQL, MongoDB)
- Using Vercel Storage capabilities

---

## Project Files Overview

### Key Files
- `vercel.json` - Deployment configuration
- `.env.local` - Local development variables
- `lib/db.ts` - Database abstraction layer
- `lib/auth.config.ts` - NextAuth configuration
- `middleware.ts` - Protected routes middleware

### API Routes
- `app/api/auth/[...nextauth]/route.ts` - Authentication
- `app/api/auth/register/route.ts` - User registration
- `app/api/students/route.ts` - Student list and creation
- `app/api/students/[id]/route.ts` - Individual student operations

### Pages
- `app/page.tsx` - Landing page
- `app/login/page.tsx` - Login page
- `app/dashboard/page.tsx` - Student management dashboard

---

## Features Included

✅ Complete CRUD operations for students  
✅ Secure authentication with NextAuth  
✅ Protected dashboard pages  
✅ Modern UI with Tailwind CSS  
✅ Database persistence  
✅ Vercel deployment ready  
✅ TypeScript for type safety  

---

## Troubleshooting

### "Module not found" errors
```bash
npm install
npm run build
```

### Database issues
```bash
# Reseed database
npm run seed
```

### Authentication not working
Check `.env.local`:
```
NEXTAUTH_SECRET=your-key
NEXTAUTH_URL=http://localhost:3000 (dev)
```

For Vercel, ensure environment variables are set in project settings.

---

## File Structure

```
student-managment/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/
│   │   │   └── [..nextauth]/
│   │   └── students/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── dashboard/
│   ├── login/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── StudentCard.tsx
│   ├── StudentForm.tsx
│   └── StudentList.tsx
├── lib/
│   ├── auth.config.ts
│   ├── auth.ts
│   └── db.ts
├── scripts/
│   └── seed.ts
├── data/
│   └── db.json
├── middleware.ts
├── vercel.json
├── package.json
└── README.md
```

---

## Contact

- **Author**: El Hasnaoui Ramadan
- **Email**: r.elhasnaoui@esisa.ac.ma
- **Repository**: https://github.com/relhasnaoui-oss/student-managment

---

## License

MIT License - Open source project
