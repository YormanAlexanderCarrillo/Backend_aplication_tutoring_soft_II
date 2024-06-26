import { ServiceAccount } from 'firebase-admin';
import { config } from 'dotenv';
config();

const type = process.env.TYPE;
const project_id = process.env.PROJECT_ID;
const private_key_id = process.env.PRIVATE_KEY_ID;
const private_key = process.env.PRIVATE_KEY;
const client_email = process.env.CLIENT_EMAIL;
const client_id = process.env.CLIENT_ID;
const auth_uri = process.env.AUTH_URI;
const token_uri = process.env.TOKEN_URI;
const auth_provider_x509_cert_url = process.env.AUTH_PROVIDER_X509_CERT_URL;
const client_x509_cert_url = process.env.CLIENT_X509_CERT_URL;
const universe_domain = process.env.UNIVERSE_DOMAIN;

const serviceAccount = {
  type: type,
  project_id: project_id,
  private_key_id: private_key_id,
  private_key: private_key,
  client_email: client_email,
  client_id: client_id,
  auth_uri: auth_uri,
  token_uri: token_uri,
  auth_provider_x509_cert_url: auth_provider_x509_cert_url,
  client_x509_cert_url: client_x509_cert_url,
  universe_domain: universe_domain,
};

export default serviceAccount as ServiceAccount;
