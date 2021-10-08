const axios = require('axios');
const { apiClient } = require('../../config').common;
const logger = require('../logger');
const { weetApiError } = require('../errors');
const { API_ERROR } = require('../../config/messageError');

exports.weet = async () => {
  try {
    const { data } = await axios.get(`${apiClient}/quotes/random`);
    return data;
  } catch (error) {
    logger.error(error.message);
    throw weetApiError(API_ERROR);
  }
};
