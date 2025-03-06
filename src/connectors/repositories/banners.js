import { requestApi } from '../api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getBanners = (params) => requestApi('get', `${this.path}`, params);
  createBanner = (params) => requestApi('post', `${this.path}`, params , true);
  editBanner = (id, params) => requestApi('patch', `${this.path}/${id}`, params , true);
  deleteBanner = (id, params) => requestApi('delete', `${this.path}/${id}`, params);
}

export const BannersRepository = new Repository('/admin/banners');
