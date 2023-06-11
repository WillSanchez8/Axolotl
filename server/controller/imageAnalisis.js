const vision = require("@google-cloud/vision");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const admin = require("firebase-admin");

initializeApp({
  credential: applicationDefault(),
});

const db = admin.firestore();
const visionClient = new vision.ImageAnnotatorClient();

async function analyzeImage(imageUrl) {
  try {
    const [result] = await visionClient.labelDetection(imageUrl);
    const labels = result.labelAnnotations.map((label) => label.description);
    await storageImages(imageUrl, labels);
    return labels;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function storageImages(imageUrl, labels) {
  try {
    const docRef = db.collection("images").doc();
    await docRef.set({
      imageUrl,
      labels,
    });
    return docRef.id;
  } catch (error) {
    console.log(error);
  }
}

async function storeUserQuery(query) {
  try {
    const snapshot = await db
      .collection("userQueries")
      .where("query", "==", query)
      .get();
    if (snapshot.empty) {
      const docRef = db.collection("userQueries").doc();
      await docRef.set({
        query,
      });
      return docRef.id;
    }
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  analyzeImage,
  storageImages,
  storeUserQuery,
};
