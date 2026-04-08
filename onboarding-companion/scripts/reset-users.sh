#!/bin/bash
# Reset all users in Firestore for the onboarding-companion project.
# Deletes all documents in the 'users' collection.
# This makes every user see the full onboarding flow (Role Select → Skills → Quiz) on next login.
#
# Usage: bash scripts/reset-users.sh

echo "🔍 Deleting all documents in 'users' collection..."
npx -y firebase-tools firestore:delete users --recursive --force --project onboarding-companion

echo ""
echo "✅ All user documents deleted."
echo "   Next login will show: Login → Role Selection → Skills Assessment → [Quiz if PM] → Dashboard"
