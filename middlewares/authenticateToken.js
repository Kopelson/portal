const admin = require('firebase-admin');

const serviceAccount = {
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
          : undefined,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

async function decodeIDToken(req, res, next) {
  const header = req.headers?.authorization;
  if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {

    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }

  next();
}

module.exports = decodeIDToken;