const admin = require('firebase-admin');
const serviceAccount = require('./service-key.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://rn-fashion-app.firebaseio.com',
});

const db = admin.firestore();

async function createDummyData() {
  const outfitSelectionOptions = [
    {
      key: 'men',
      label: 'For men',
    },
    {
      key: 'women',
      label: 'For Women',
    },
    {
      key: 'both',
      label: 'For both',
    },
  ];

  // Add posts to Firestore
  for (const brand of outfitSelectionOptions) {
    const outfitRef = await db.collection('outfitSelections').add(brand);
  }
}

// Run the function to create dummy data
createDummyData()
  .then(() => {
    console.log('Dummy data created successfully');
    process.exit();
  })
  .catch(error => {
    console.error('Error creating dummy data:', error);
    process.exit(1);
  });
