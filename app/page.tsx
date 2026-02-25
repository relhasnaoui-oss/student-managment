import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth();
  
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <main className="flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Student Management System
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-md">
            Manage students efficiently with our modern application
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href="/login"
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
          >
            Sign In
          </a>
          <a
            href="#features"
            className="px-8 py-3 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold rounded-lg transition"
          >
            Learn More
          </a>
        </div>

        <div id="features" className="mt-16 max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Student Management</h3>
              <p className="text-gray-600">Add, edit, and manage student records easily</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Authentication</h3>
              <p className="text-gray-600">Protected with NextAuth for secure access</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Database Storage</h3>
              <p className="text-gray-600">Reliable SQLite database for data persistence</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern UI</h3>
              <p className="text-gray-600">Beautiful interface built with Tailwind CSS</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
