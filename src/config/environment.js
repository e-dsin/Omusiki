// config/environment.js

const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    apiUrl: "http://localhost:3001",
    cdnUrl: "http://localhost:3001/static",
    stripePublicKey: "pk_test_XXXXXXXXXXXXXXXXXXXXXXXX",
    googleClientId: "XXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com",
    appleClientId: "com.omusika.web",
    sentryDsn: null,
    features: {
      analytics: false,
      errorReporting: false,
      serviceWorker: false,
      pushNotifications: false,
    },
  },
  production: {
    apiUrl: "https://api.omusika.com",
    cdnUrl: "https://cdn.omusika.com",
    stripePublicKey: "pk_live_XXXXXXXXXXXXXXXXXXXXXXXX",
    googleClientId: "XXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com",
    appleClientId: "com.omusika.web",
    sentryDsn: "https://XXXXXXXXXXXXXXXXXXXXXXXX@sentry.io/XXXXXXX",
    features: {
      analytics: true,
      errorReporting: true,
      serviceWorker: true,
      pushNotifications: true,
    },
  },
  test: {
    apiUrl: "http://localhost:3001",
    cdnUrl: "http://localhost:3001/static",
    stripePublicKey: "pk_test_XXXXXXXXXXXXXXXXXXXXXXXX",
    googleClientId: "test-client-id",
    appleClientId: "test-apple-id",
    sentryDsn: null,
    features: {
      analytics: false,
      errorReporting: false,
      serviceWorker: false,
      pushNotifications: false,
    },
  },
};

export default config[env];
