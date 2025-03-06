import { requestApi } from '../api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  createCategory = (params) => requestApi('post', `${this.path}`, params, true);
  getCategories = (params) => requestApi('get', `${this.path}`, params);
  editCategory = (id, params) => requestApi('put', `${this.path}/${id}`, params, true);
  deleteCategory = (id, params) => requestApi('delete', `${this.path}/${id}`, params);
}

export const CategoriesRepository = new Repository('/admin/categories');
