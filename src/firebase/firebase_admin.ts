import { getStorage } from 'firebase-admin/storage';
import { config } from 'dotenv';
import { ServiceAccount, cert, initializeApp } from 'firebase-admin/app';
config();

var serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECTIDE,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X590_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
} as ServiceAccount;

const firebaseConfig = {
  credential: cert(serviceAccount),
  storageBucket: process.env.STORAGEBUCKET,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
