import React from 'react';
import styled from 'styled-components';

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
  );
};

export default UserLoader;
