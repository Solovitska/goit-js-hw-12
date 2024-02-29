// pixabay-api.js

import axios from 'axios';

const apiKey = '42574580-2c52a100a2b29f75d1ac631cf';
const apiBaseUrl = 'https://pixabay.com/api/';

export async function getPhotoByName(searchParams) {
  try {
    const response = await axios.get(apiBaseUrl, {
      params: { ...searchParams, key: apiKey },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  }
}