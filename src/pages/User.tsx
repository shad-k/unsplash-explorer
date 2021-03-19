import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import getUser from '../api/getUser';
import getUserPhotos from '../api/getUserPhotos';
import { FullUser, UserPhoto } from '../types';

import PhotoModal from '../components/PhotoModal';
import UserLoader from '../components/UserLoader';

import leftArrow from '../images/left-arrow.svg';

const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

const StyledLink = styled(Link)`
  margin-top: ${({ theme }) => theme.spacing.l};
  border: none;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  width: 120px;
  text-align: center;
`;

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.spacing.l};
  padding-top: 60px;
`;

const Header = styled.header`
  height: 48px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.s};

  & img {
    width: 24px;
  }
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
  object-fit: contain;
  object-position: center;
  border-radius: ${({ theme }) => theme.borderRadius.round};
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.spacing.m};
  padding-left: ${({ theme }) => theme.spacing.m};
`;

const Username = styled.div`
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-left: ${({ theme }) => theme.spacing.m};
`;

const Name = styled.div`
  font-size: ${({ theme }) => theme.fontSize.large};
`;

const UserPhotos = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.l};

  & > div {
    margin: ${({ theme }) => theme.spacing.xxs};
    height: 100px;
    width: 100px;
    border: 1px solid ${({ theme }) => theme.colors.border};

    & > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
`;

const User: React.FC<{}> = () => {
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<FullUser | null>();
  const [userPhotos, setUserPhotos] = React.useState<UserPhoto[]>([]);
  const [showPhotoModal, setShowPhotoModal] = React.useState<boolean>(false);
  const [currentPhoto, setCurrentPhoto] = React.useState<number>(0);

  React.useEffect(() => {
    (async () => {
      const userResponse = await getUser(username);
      setUser(userResponse);
      setLoading(false);
    })();

    (async () => {
      const photos = await getUserPhotos(username);
      setUserPhotos(photos);
    })();
  }, [username]);

  const openPhoto = (index: number) => {
    setShowPhotoModal(true);
    setCurrentPhoto(index);
  };

  if (loading) {
    return <UserLoader />;
  }

  if (!user && !loading) {
    return (
      <NotFound>
        No such user user exist.
        <StyledLink to="/">Go to Home</StyledLink>
      </NotFound>
    );
  }

  return (
    <Main>
      <Header>
        <Link to="/">
          <img src={leftArrow} alt="" />
        </Link>
        <Username>@{user?.username}</Username>
      </Header>
      <Image src={user?.profileImage} />
      <Details>
        <Name>{user?.name}</Name>
      </Details>

      {userPhotos.length > 0 ? (
        <UserPhotos>
          {userPhotos.map((photo: UserPhoto, index: number) => {
            return (
              <div onClick={() => openPhoto(index)}>
                <img src={photo.urls.thumb} alt={photo.description || ''} />
              </div>
            );
          })}
        </UserPhotos>
      ) : null}
      {showPhotoModal ? (
        <PhotoModal
          photo={userPhotos[currentPhoto]}
          onClose={() => setShowPhotoModal(false)}
          nextPhoto={
            currentPhoto < userPhotos.length - 1
              ? () => setCurrentPhoto(currentPhoto + 1)
              : undefined
          }
          prevPhoto={
            currentPhoto > 0
              ? () => setCurrentPhoto(currentPhoto - 1)
              : undefined
          }
        />
      ) : null}
    </Main>
  );
};

export default User;
