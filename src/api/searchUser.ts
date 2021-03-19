import unsplashApi from './index';

import { User } from '../types';

const searchUser = async (query: string): Promise<User[]> => {
  try {
    const apiResponse = await unsplashApi.search.getUsers({
      query,
      page: 1,
      perPage: 10,
    });

    if(apiResponse.type === 'success') {
      return apiResponse.response.results.map(({ id, username, name, profile_image }) => ({
        id,
        username,
        name,
        profileImage: profile_image.small,
      }));
    } else if(apiResponse.type === 'error') {
      throw new Error(apiResponse.errors[0]);
    } else {
      return Promise.reject();
    }
  } catch(error) {
    return Promise.reject(error);
  }
}

export default searchUser;