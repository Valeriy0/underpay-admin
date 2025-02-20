import { requestApi } from '../api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getProducts = (params) => requestApi('get', `${this.path}`, params);
  createProduct = (params) => requestApi('post', `${this.path}`, params, true);
}

export const ProductsRepository = new Repository('/admin/product');
