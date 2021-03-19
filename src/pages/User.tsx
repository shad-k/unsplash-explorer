import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import getUser from '../api/getUser';
import { FullUser } from '../types';

const LoaderMain = styled.div`
  padding: ${({ theme }) => theme.spacing.l};
  display: flex;
  flex-wrap: wrap;
`;

const ImageLoader = styled.div`
  background-color: ${({ theme }) => theme.colors.grey_100};
  height: 100px;
  width: 100px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
`;

const DetailsLoader = styled.div`
  flex: 1;
  padding-left: ${({ theme }) => theme.spacing.m};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & div {
    height: 15px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.grey_100};
    margin-bottom: ${({ theme }) => theme.spacing.s};
  }

  & .bio-loader {
    height: 30px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.grey_100};
  }
`;

const UserLoader: React.FC<{}> = () => {
  return (
    <LoaderMain>
      <ImageLoader />
      <DetailsLoader>
        <div />
        <div />
        <div className="bio-loader" />
      </DetailsLoader>
    </LoaderMain>
  )
}

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
  justify-content: center;
  padding-left: ${({ theme }) => theme.spacing.m};
`;

const Username = styled.div`
  font-size: ${({ theme }) => theme.fontSize.large};
`;

const Name = styled.div`
  font-size: ${({ theme }) => theme.fontSize.small};
`;

const User: React.FC<{}> = () => {
  const { username } = useParams<{username: string}>();
  const [loading, setLoading ] = React.useState(true);
  const [user, setUser] = React.useState<FullUser | null>();

  React.useEffect(() => {
    (async () => {
      const userResponse = await getUser(username);
      console.log(userResponse);
      setUser(userResponse);
      setLoading(false);
    })();
  }, [username]);

  if(loading) {
    return <UserLoader />
  }

  if(!user && !loading) {
    return <NotFound>
        No such user user exist.
        <StyledLink to="/">Go to Home</StyledLink>
      </NotFound>
  }

  return (<Main>
    <Image src={user?.profileImage} />
    <Details>
      <Username>{user?.username}</Username>
      <Name>{user?.name}</Name>
    </Details>
  </Main>)
}

export default User;