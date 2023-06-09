const axios = require("axios");
const { Translate } = require("@google-cloud/translate").v2;
const { getLabels } = require("../models/firebase");

const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

async function getPexelsImages(req, res) {
  try {
    const query = req.params.query;
    const translatedQuery = await translateText(query, "en");
    const response = await axios.get(
      `https://api.pexels.com/v1/search?query=${translatedQuery}`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      }
    );
    const images = response.data.photos.map((photo) => photo.src.large);
    const labels = await Promise.all(
      images.map(async (image) => {
        const englishLabels = await getLabels(image);
        const spanishLabels = await Promise.all(
          englishLabels.map((label) => translateText(label, "es"))
        );
        return spanishLabels;
      })
    );
    res.status(200).json({ photos: response.data.photos, labels });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Ha ocurrido un error mientras se hacia la solicitud hacia el API Pexels",
    });
  }
}

async function translateText(text, targetLanguage) {
  try {
    let [translations] = await translate.translate(text, targetLanguage);
    translations = Array.isArray(translations)
      ? translations
      : [translations];
    return translations[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  getPexelsImages
};
