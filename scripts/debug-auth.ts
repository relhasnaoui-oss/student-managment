console.log('debug-auth script starting');
import { GET } from '../app/api/auth/[...nextauth]/route';
import { NextRequest } from 'next/server';

// create a dummy NextRequest
const req = new NextRequest('http://localhost/api/auth/session');

(async () => {
  try {
    const res = await GET(req as any);
    console.log('Response status:', res.status);
    const body = await res.text();
    console.log('Body:', body);
  } catch (err) {
    console.error('Error calling GET:', err);
  }
})();