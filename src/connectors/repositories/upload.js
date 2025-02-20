import { requestApi } from '../api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  postAvatar = (params) => requestApi('post', `${this.path}/avatar`, { file: params }, true);
}

export const UploadRepository = new Repository('/upload');
