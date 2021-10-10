import axios from 'axios';

const apiClient = axios.create({
  // timeout: config.api.timeout,
  baseURL: 'api/',
  headers: {},
});

apiClient.interceptors.response.use(
  response => Promise.resolve(response.data),
  error => Promise.reject(error),
);

apiClient.interceptors.request.use(conf => {
  // const apiToken = new ApiToken();
  // apiToken.getFromCookie();

  // conf.headers.Authorization = `Bearer ${apiToken.token}`;
  return conf;
});

export default apiClient;
