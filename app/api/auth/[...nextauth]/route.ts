import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth.config';

// Initialize NextAuth and get all handlers
const authHandler = NextAuth(authConfig as any);

// NextAuth v5 returns handlers directly or wrapped
// Try to get GET/POST from handlers property first, then from main object
const handlers = (authHandler as any).handlers || authHandler;
export const GET = handlers.GET;
export const POST = handlers.POST;

// Export auth function for server-side use
export const auth = (authHandler as any).auth || authHandler;

