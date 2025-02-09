const admin = require('firebase-admin');

// Load Firebase Admin credentials (from Firebase Console > Service Accounts)
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const setAdminRole = async (uid) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`User ${uid} is now an admin.`);
  } catch (error) {
    console.error('Error setting admin role:', error);
  }
};

// Replace with the user's actual UID
setAdminRole('0PRGWfKqzjZJqDPrYJQCK6OuNM13');
