const admin = require("firebase-admin");
const { analyzeImage } = require("../controller/imageAnalisis");

const db = admin.firestore();

async function getLabels(imageUrl) {
  try {
    const snapshot = await db
      .collection("images")
      .where("imageUrl", "==", imageUrl)
      .get();
    if (snapshot.empty) {
      const labels = await analyzeImage(imageUrl);
      return labels;
    }
    const labels = snapshot.docs[0].data().labels;
    return labels;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  getLabels,
};
