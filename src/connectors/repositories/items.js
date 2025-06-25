import { requestApi } from '../api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  editItem = (id, data) => requestApi('put', `${this.path}/items`, data);
}

export const ItemsRepository = new Repository('withdrawals'); 