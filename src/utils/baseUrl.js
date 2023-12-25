// dev test
// console.log(process?.env?.REACT_APP_FACEBOOK_ID, "Process");
// console.log(window?.env?.REACT_APP_FACEBOOK_ID, "Window");
// Google Login
export const clientId = process.env.REACT_APP_GOOGLE_CLIENT;
// ??
// "294171754509-0n3c86m2ede9fqhfbgmfoutmcg1trh30.apps.googleusercontent.com";
export const clientSecret = process.env.REACT_APP_GOOGLE_SECRET;
// ?? "16p2D42DW-cXTCDxsX7mHOma";

//Facebook Login
export const FBAppId = process.env.REACT_APP_FACEBOOK_ID;
// ?? "269699634558562";

// Stripe Publix Key
export const StripeKey =
  process.env.REACT_APP_ENVIRONMENT === "prod"
    ? process.env.REACT_APP_STRIPE_LIVE_KEY
    : process.env.REACT_APP_STRIPE_TEST_KEY;
