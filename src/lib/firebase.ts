/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// This will be populated by the platform after setup
// We use a dummy for now to avoid crashes if the file isn't there yet
let firebaseConfig = {};
try {
  // @ts-ignore
  import config from '../firebase-applet-config.json';
  firebaseConfig = config;
} catch (e) {
  console.warn('Firebase config not found. Please complete the setup.');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// @ts-ignore
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export default app;
