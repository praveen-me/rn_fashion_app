const admin = require('firebase-admin');
const serviceAccount = require('./service-key.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://rn-fashion-app.firebaseio.com',
});

const db = admin.firestore();

// Create a sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createDummyData() {
  const outfitSelectionOptions = [
    {value: 's'},
    {value: 'm'},
    {value: 'l'},
    {value: 'xl'},
    {value: 'xxl'},
  ];

  // Add posts to Firestore
  for (const brand of outfitSelectionOptions) {
    const outfitRef = await db
      .collection('clothingSize')
      .add({...brand, createdAt: admin.firestore.Timestamp.now()});

    // Wait for 1 second before adding the next post
    await sleep(1000);
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
