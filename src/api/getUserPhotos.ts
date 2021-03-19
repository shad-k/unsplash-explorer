import unsplashApi from './index';

import { UserPhoto } from '../types';

const getUserPhotos = async (
  username: string,
  page: number = 1
): Promise<UserPhoto[]> => {
  try {
    const apiResponse = await unsplashApi.users.getPhotos({ username, page });

    if (apiResponse.type === 'success') {
      return apiResponse.response.results.map((photo) => {
        const { id, created_at, description, urls } = photo;
        return {
          id,
          createdAt: created_at,
          description,
          urls: {
            thumb: urls.thumb,
            full: urls.full,
          },
        };
      });
    } else if (apiResponse.type === 'error') {
      throw new Error(apiResponse.errors[0]);
    } else {
      return Promise.reject();
    }
  } catch (error) {
    if (error.message.startsWith('The user aborted a request.')) {
      return Promise.resolve([]);
    }
    return Promise.reject(error);
  }
};

export default getUserPhotos;
