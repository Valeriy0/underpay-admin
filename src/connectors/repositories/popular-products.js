import { requestApi } from '../api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getPopularProducts = (params) => requestApi('get', `${this.path}`, params);
}

export const PopularProductsRepository = new Repository('/popular-products');
