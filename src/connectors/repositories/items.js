import { requestApi } from '../api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  editItem = (id, data) => requestApi('put', `${this.path}/methods/1/items/${id}`, data);
}

export const ItemsRepository = new Repository('withdrawals'); 