import { requestApi } from '../api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  searchItem = (params) => requestApi('get', `${this.path}/search?itemName=Diamonds`, params);
}

export const WithdrawalsRepository = new Repository('/withdrawals');
