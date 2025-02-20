import axios from 'axios';
import Qs from 'qs';
import { destroyCookie, parseCookies } from 'nookies';
import config from '../helpers/config';

//for interceptors etc.

export const instance = axios.create({
  baseURL: config.apiUrl,
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      destroyCookie(null, 'apiToken');
      window.location.href = '/';
    }

    return Promise.reject(error);
  },
);

// createMocks(new MockAdapter(instance, { delayResponse: 500 }));

export const requestApi = async (method, url, data, multipart = false, isFilesArray = false) => {
  const config = {
    method: method,
    url: url,
    params: {},
  };

  if (data) {
    switch (method) {
      case 'post':
      case 'put':
      case 'patch':
        config.data = data;
        break;
      default:
        config.params = { ...config.params, ...data };
        break;
    }
  }

  if (multipart) {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (isFilesArray && Array.isArray(data[key])) {
          data[key].forEach((item, index) => {
            formData.append(`${key}[${index}]`, data[key][index]);
          });
        } else if (Array.isArray(data[key])) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
    }
    config.headers = { 'Content-Type': undefined, enctype: 'multipart/form-data' };
    config.data = formData;
  } else if (method !== 'get') {
    config.data = data;
  }

  const cookies = parseCookies();

  instance.defaults.headers.Authorization = cookies?.apiToken ? `Bearer ${cookies?.apiToken}` : null;

  try {
    const { data } = await instance.request(config);

    return data;
  } catch (error) {
    throw error;
  }
};
