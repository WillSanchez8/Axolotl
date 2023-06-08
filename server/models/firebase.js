const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_CREDENTIALS
});

const db = admin.firestore();

async function storageImages(imageUrl, labels) {
    try{
        const docRef = db.collection('images').doc();
        await docRef.set({
            imageUrl,
            labels
        });
        return docRef.id;
    }catch (error){
        console.log(error);
    }
}

module.exports = {
    storageImages
}