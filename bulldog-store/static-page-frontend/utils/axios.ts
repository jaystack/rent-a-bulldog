import axios, { AxiosRequestConfig, AxiosError } from 'axios';

const getErrorMessage = ({ response }: AxiosError) => {
  if (response?.data?.message) return response.data.message;
  if (response?.data?.Errors && response.data.Errors.length) {
    return response.data.Errors.reduce((acc: string, curr: { Message: string }) => acc.concat(curr.Message, ' \n'), '');
  }
  return 'Something went wrong';
};

const invoke = (
  method: AxiosRequestConfig['method'],
  API_URL: string,
) => async (
  url = '/',
  {
    body = undefined as Record<string, any> | undefined,
    headers = {},
    query = {},
    accept = 'application/json',
    responseType = ('json' as
      | AxiosRequestConfig['responseType']
      | 'stream') as AxiosRequestConfig['responseType'],
  },
  ) => {
    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        responseType,
        baseURL: API_URL,
        headers: {
          Accept: accept,
          ...headers,
        },
        data: body,
        params: query,
      };
      const response = await axios(config);
      return response.data;
    } catch (e) {
      const message = getErrorMessage(e);
      const status = e.response && e.response.status;
      const error = { message, status };
      console.error('API error: ', e); // eslint-disable-line no-console
      throw error;
    }
  };

const api = (API_URL: string) => ({
  get: invoke('GET', API_URL),
  post: invoke('POST', API_URL),
  put: invoke('PUT', API_URL),
  patch: invoke('PATCH', API_URL),
  delete: invoke('DELETE', API_URL),
});

export default api;
