import unsplashApi from './index';

import { FullUser } from '../types';

const searchUser = async (username: string): Promise<FullUser | null> => {

  try {
    const apiResponse = await unsplashApi.users.get({username});

    if (apiResponse.type === 'success') {
      const { id, name, username, profile_image, total_likes, total_photos, bio, followers_count } = apiResponse.response;
      return {
        id,
        name,
        username,
        profileImage: profile_image && profile_image.medium,
        totalLikes: total_likes,
        totalPhotos: total_photos,
        bio,
        followersCount: followers_count,
      }
    } else if (apiResponse.type === 'error') {
      throw new Error(apiResponse.errors[0]);
    } else {
      return Promise.reject();
    }
  } catch (error) {
    if(error.message.startsWith('The user aborted a request.')) {
      return Promise.resolve(null);
    }
    return Promise.reject(error);
  }
};

export default searchUser;
