import * as admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

// Check if Service Account JSON is provided as a Vercel Environment Variable
const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;

if (serviceAccountEnv) {
  try {
    const serviceAccount = JSON.parse(serviceAccountEnv);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('✅ Firebase Admin SDK initialized successfully via Environment Variable.');
  } catch (error) {
    console.error('❌ Error parsing FIREBASE_SERVICE_ACCOUNT env variable:', error);
  }
} else {
  // Look for a local serviceAccountKey.json file
  const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');

  if (!fs.existsSync(serviceAccountPath)) {
    console.warn('\n⚠️ WARNING: serviceAccountKey.json not found in backend directory, and FIREBASE_SERVICE_ACCOUNT env variable is missing!');
    console.warn('Firebase Admin SDK could not be initialized.');
  } else {
    try {
      const serviceAccount = require(serviceAccountPath);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log('✅ Firebase Admin SDK initialized successfully via local JSON file.');
    } catch (error) {
      console.error('❌ Error initializing Firebase Admin SDK via local file:', error);
    }
  }
}

export const db = admin.apps.length ? admin.firestore() : null;
