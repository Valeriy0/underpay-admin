import { requestApi } from '../api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  addProductToPopularProducts = (id, params) => requestApi('post', `${this.path}/${id}`, params);
  deleteProductFromPopularProducts = (id) => requestApi('delete', `${this.path}/${id}`);
}

export const PopularProductsRepository = new Repository('/admin/popular-products');
