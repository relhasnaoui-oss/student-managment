# Student Management System

A full-stack student management application built with Next.js, SQLite, and NextAuth authentication.

## Features

- ✅ Complete student CRUD operations
- ✅ Secure authentication with NextAuth
- ✅ SQLite database for data persistence
- ✅ Modern responsive UI with Tailwind CSS
- ✅ Protected dashboard pages
- ✅ Vercel deployment ready

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: SQLite with better-sqlite3
- **Authentication**: NextAuth v5
- **Styling**: Tailwind CSS
- **Deployment**: Vercel compatible

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/relhasnaoui-oss/student-managment.git
cd student-managment
```

2. Install dependencies:
```bash
npm install
```

3. Create database and seed initial data:
```bash
npm run seed
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Default Credentials

For testing, use these credentials to log in:
- **Email**: admin@example.com
- **Password**: admin123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create new student
- `GET /api/students/[id]` - Get specific student
- `PUT /api/students/[id]` - Update student
- `DELETE /api/students/[id]` - Delete student

## Project Structure

```
.
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── register/
│   │   └── students/
│   ├── dashboard/
│   ├── login/
│   └── page.tsx
├── components/
│   ├── StudentCard.tsx
│   ├── StudentForm.tsx
│   └── StudentList.tsx
├── lib/
│   ├── auth.ts
│   ├── auth.config.ts
│   └── db.ts
├── scripts/
│   └── seed.ts
└── vercel.json
```

## Building for Production

```bash
npm run build
npm start
```

## Deploying to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables:
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Your Vercel domain
4. Deploy

## Environment Variables

Create a `.env.local` file for development:

```
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

For production on Vercel, add these in the project settings.

## License

This project is open source and available under the MIT License.

## Author

Created for Student Management Solution

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
