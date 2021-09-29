import axios from 'axios';

export async function weet() {
  try {
    const response = await axios.get('https://quote-garden.herokuapp.com/api/v3/quotes/random');
    return response.data.data;
  } catch (error) {
    return { message: 'Error en el servidor', error };
  }
}
