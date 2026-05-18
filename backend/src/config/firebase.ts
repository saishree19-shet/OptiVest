import * as admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

// Look for a serviceAccountKey.json in the backend root directory
const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.warn('\n⚠️ WARNING: serviceAccountKey.json not found in backend directory!');
  console.warn('Firebase Admin SDK could not be initialized.');
  console.warn('Firestore integration will fail. Please generate a Service Account key and place it at:');
  console.warn(serviceAccountPath, '\n');
} else {
  try {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('✅ Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('❌ Error initializing Firebase Admin SDK:', error);
  }
}

export const db = admin.apps.length ? admin.firestore() : null;
