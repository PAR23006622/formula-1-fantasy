import { Auth0Client } from "@auth0/nextjs-auth0/server";

if (!process.env.AUTH0_DOMAIN) {
  throw new Error('AUTH0_DOMAIN is not defined');
}
if (!process.env.AUTH0_CLIENT_ID) {
  throw new Error('AUTH0_CLIENT_ID is not defined');
}
if (!process.env.AUTH0_CLIENT_SECRET) {
  throw new Error('AUTH0_CLIENT_SECRET is not defined');
}
if (!process.env.AUTH0_SECRET) {
  throw new Error('AUTH0_SECRET is not defined');
}
if (!process.env.AUTH0_BASE_URL && !process.env.APP_BASE_URL) {
  throw new Error('Either AUTH0_BASE_URL or APP_BASE_URL must be defined');
}

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  secret: process.env.AUTH0_SECRET,
  appBaseUrl: "https://formula1fantasy.vercel.app",
  authorizationParameters: {
    redirect_uri: "https://formula1fantasy.vercel.app/api/auth/callback",
    returnTo: "/account"
  }
}); 