const axios = require('axios');

exports.healthCheck = (_, res) => res.status(200).send({ uptime: process.uptime() });
exports.witter = (_, res) => {
  axios
    .get('https://quote-garden.herokuapp.com/api/v3/quotes/random')
    .then(response => {
      // handle success
      res.status(200).json(response.data.data);
    })
    .catch(error => {
      // handle error
      res.status(500).send({ message: 'Error en el servidor', error });
    });
};
