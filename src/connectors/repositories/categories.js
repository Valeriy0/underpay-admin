import { requestApi } from '../api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  createCategory = (params) => requestApi('post', `${this.path}`, params);
}

export const CategoriesRepository = new Repository('/admin/categories');
