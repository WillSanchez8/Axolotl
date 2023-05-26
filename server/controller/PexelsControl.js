const axios = require("axios");
const use = require("@tensorflow-models/universal-sentence-encoder");

async function getPexelsImages(req, res) {
  try {
    // Carga el modelo
    const model = await use.load();

    // Obtiene la representación vectorial de la consulta
    const query = req.params.query;
    const embeddings = await model.embed(query);

    // Calcula la similitud de coseno entre la representación vectorial de la consulta y las representaciones vectoriales precalculadas
    // ...

    // Utiliza la información de la similitud de coseno para determinar mejores resultados de búsqueda
    // ...

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
