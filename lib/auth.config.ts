// server-only logic — do not use the top-level "use server" directive

import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import db, { initializeDatabase } from './db';

export const authConfig = {
  // debug logging to investigate client fetch issues
  debug: true,
  logger: {
    error(code, metadata) {
      console.error('NextAuth error', code, metadata);
    },
    warn(code) {
      console.warn('NextAuth warning', code);
    },
    debug(code, metadata) {
      console.log('NextAuth debug', code, metadata);
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret',
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials: any) {
        console.log('credentials authorize called', credentials);
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = db.prepare('SELECT * FROM users WHERE email = ?').get(credentials.email) as any;
          
          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          
          if (!passwordMatch) {
            return null;
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
