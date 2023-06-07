const axios = require('axios');
const { Translate } = require('@google-cloud/translate').v2;
const vision = require('@google-cloud/vision');

const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

const visionClient = new vision.ImageAnnotatorClient();

async function getPexelsImages(req, res) {
  try {
    const query = req.params.query;
    //translateText recibe dos parámetros el texto a traducir y el idioma al que se quiere traducir
    const translatedQuery = await translateText(query, 'en');
    const response = await axios.get(
      `https://api.pexels.com/v1/search?query=${translatedQuery}`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        'Ha ocurrido un error mientras se hacia la solicitud hacia el API Pexels',
    });
  }
}

async function translateText(text, targetLanguage) {
  try{
    let [translations] = await translate.translate(text, targetLanguage);
    translations = Array.isArray(translations) ? translations : [translations];
    return translations[0];
  }catch(error){
    console.error(error);
    return null;
  }
}

module.exports = {
  getPexelsImages,
};
