const axios = require("axios");

async function getPexelsImages(req, res) {
  try {
    const query = req.params.query;
    const response = await axios.get(
      `https://api.pexels.com/v1/search?query=${query}`,
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
        "Ha ocurrido un error mientras se hacia la solicitud hacia el API Pexels",
    });
  }
}

module.exports = {
  getPexelsImages,
};
