console.log('starting fetch-session script');
const fetch = require('node-fetch');

(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/session');
    console.log('status', res.status);
    console.log('headers', res.headers.raw());
    const text = await res.text();
    console.log('body', text);
  } catch (err) {
    console.error(err);
  }
})();