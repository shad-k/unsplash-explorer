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
