export type User = {
  id: string;
  username: string;
  name: string;
  profileImage: string;
};

export type FullUser = {
  id: string;
  username: string;
  name: string;
  profileImage: string;
  bio: string | null;
  totalLikes: number;
  totalPhotos: number;
  followersCount: number;
};

export type UserPhoto = {
  id: string;
  createdAt: string;
  description: string | null;
  urls: {
    thumb: string;
    full: string;
  };
};
