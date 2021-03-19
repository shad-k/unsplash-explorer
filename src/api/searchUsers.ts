import unsplashApi from './index';

import { User } from '../types';

let onGoingRequest = false;
let controller: AbortController;
let signal;
const searchUsers = async (query: string): Promise<User[]> => {
  if (onGoingRequest) {
    controller.abort();
  }

  controller = new AbortController();
  signal = controller.signal;
  onGoingRequest = true;

  try {
    const apiResponse = await unsplashApi.search.getUsers(
      {
        query,
        page: 1,
        perPage: 10,
      },
      { signal }
    );

    signal = null;
    onGoingRequest = false;

    if (apiResponse.type === 'success') {
      return apiResponse.response.results.map(
        ({ id, username, name, profile_image }) => ({
          id,
          username,
          name,
          profileImage: profile_image.small,
        })
      );
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

export default searchUsers;
