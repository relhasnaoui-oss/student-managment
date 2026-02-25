// Re-export auth from the NextAuth API route so we only initialize it once
// signIn/signOut are handled client-side via next-auth/react
export { auth } from '../app/api/auth/[...nextauth]/route';
