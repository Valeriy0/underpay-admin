import { requestApi } from '../api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getTelegramSecretCode = (params) => requestApi('get', `${this.path}/request`, params);
}

export const TelegramRepository = new Repository('/telegram');
