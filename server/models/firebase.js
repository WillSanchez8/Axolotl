const {initializeApp, applicationDefault} = require('firebase-admin/app');
const admin = require('firebase-admin');

initializeApp({
    credential: applicationDefault(),
})

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
    storageImages,
}