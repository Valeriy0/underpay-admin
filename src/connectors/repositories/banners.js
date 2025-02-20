import { requestApi } from '../api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getBanners = (params) => requestApi('get', `${this.path}`, params);
  createBanner = (params) => requestApi('post', `${this.path}`, params , true);
}

export const BannersRepository = new Repository('/admin/banners');
