import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'gjWCJZ9SXOPUhBVHC2eSFaOgKdUA3w0sxUms5uN_cNI';
const UNSPLASH_SECRET_KEY = 'wUeA_VSRWu-x50JUL4MjMziWwdtsHVpwNmH4W0w1zi0';

export async function getAccessToken() {
  try {
    const response = await axios.post('https://unsplash.com/oauth/token', {
      client_id: UNSPLASH_ACCESS_KEY,
      client_secret: UNSPLASH_SECRET_KEY,
      grant_type: 'client_credentials',
    });

    return response.data.access_token;
  } catch (error) {
    throw new Error('Failed to obtain an access token');
  }
}