import getConfig from 'next/config';
import api from '../utils/axios';



const { publicRuntimeConfig: { apiUrl } } = getConfig();
// Declare api factory for BLG request based on BLG url
const axios = api(apiUrl || '');

// Session Query
export const getBulldogs = () =>
  axios.get('/bulldogs', {});

export const getBulldogById = (id: string) =>
  axios.get(`/bulldog/${id}`, {});

