import { requestApi } from '../api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getProducts = (params) => requestApi('get', `${this.path}`, params);
  createProduct = (params) => requestApi('post', `${this.path}`, params, true);
  editProduct = (id, params) => requestApi('put', `${this.path}/${id}`, params, true);
  deleteProduct = (id) => requestApi('delete', `${this.path}/${id}`);
}

export const ProductsRepository = new Repository('/admin/product');
