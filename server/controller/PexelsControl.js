const axios = require('axios');

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
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/v3beta1/projects/axolotl-tescha:translateText?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
      {
        contents: [text],
        targetLanguageCode: targetLanguage,
      }
    );
    return response.data.translations[0].translatedText;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  getPexelsImages,
};
