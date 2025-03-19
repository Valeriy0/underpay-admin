import { requestApi } from '../api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  searchItem = (params) => requestApi('get', `${this.path}/search?itemName=Diamonds`, params);
  getItems = (params) => requestApi('get', `${this.path}/methods/1/items`, params);
}

export const WithdrawalsRepository = new Repository('/admin/withdrawals');
