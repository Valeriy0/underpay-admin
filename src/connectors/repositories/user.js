import { requestApi } from '../api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {

  getBanners = (params) => requestApi('get', `${this.path}/search`, params);

  getProfile = (params) => requestApi('get', `${this.path}/me`, params);

  getProfileWithoutToken = (params) => requestApi('get', `${this.path}/user?userAddress=${params}`);

  postProfile = (newNickName, newEmail, newX, newInstagram) =>
    requestApi('post', `${this.path}/profile`, { newNickName, newEmail, newX, newInstagram });
}

export const UserRepository = new Repository('/withdrawals');
