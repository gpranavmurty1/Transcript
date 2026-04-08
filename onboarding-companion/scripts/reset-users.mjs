// Reset script: Deletes all user documents from Firestore
// This resets the app to a fresh state — all users will see Role Selection on next login.
//
// Usage: node scripts/reset-users.mjs
//
// Requires: GOOGLE_APPLICATION_CREDENTIALS env var pointing to a service account key,
//           OR run from a machine with Firebase CLI logged in.

import { initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize with application default credentials (works if firebase CLI is logged in)
// Or set GOOGLE_APPLICATION_CREDENTIALS to a service account JSON path
try {
  initializeApp({ credential: applicationDefault() });
} catch (e) {
  // Fallback: initialize with project ID only (works with gcloud auth)
  initializeApp({ projectId: 'onboarding-companion' });
}

const db = getFirestore();

async function resetAllUsers() {
  console.log('🔍 Fetching all user documents...');
  const usersSnapshot = await db.collection('users').get();

  if (usersSnapshot.empty) {
    console.log('✅ No user documents found. Nothing to reset.');
    return;
  }

  console.log(`📋 Found ${usersSnapshot.size} user document(s). Deleting...`);

  const batch = db.batch();
  usersSnapshot.docs.forEach((doc) => {
    console.log(`  🗑️  ${doc.id} (${doc.data().name || 'unknown'} — ${doc.data().role || 'no role'})`);
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log(`✅ Deleted ${usersSnapshot.size} user document(s). All users will see the onboarding flow on next login.`);
}

resetAllUsers().catch((err) => {
  console.error('❌ Error resetting users:', err.message);
  process.exit(1);
});
