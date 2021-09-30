import axios from 'axios';

const config = require('../../config');
const logger = require('../logger');
const errors = require('../errors');

export async function weet() {
  try {
    const { data } = await axios.get(`${config.common.apiClient}/quotes/random`);
    return data;
  } catch (err) {
    const error = errors.defaultError('There is an error in server');
    return logger.error(error);
  }
}
