import React from 'react';
import styled from 'styled-components';

import { UserPhoto } from '../types';

const Main = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backdrop};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Photo = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 80%;
  padding: ${({ theme }) => theme.spacing.l};
  margin: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Close = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xLarge};
  text-align: right;
  margin-bottom: ${({ theme }) => theme.spacing.l};
`;

const Image = styled.img`
  height: 60%;
  object-fit: contain;
  object-position: center;
  background-color: ${({ theme }) => theme.colors.app_background};
  padding: ${({ theme }) => theme.spacing.xs};
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.s};
  overflow: auto;
`;

const Description = styled.span`
  font-size: ${({ theme }) => theme.fontSize.medium};
`;

const CreatedAt = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.textLight};
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.s};
`;

const Button = styled.button`
  margin-top: ${({ theme }) => theme.spacing.l};
  border: none;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  width: 70px;
  text-align: center;

  &.hide {
    visibility: hidden;
  }
`;

const Previous = styled(Button)``;

const Next = styled(Button)``;

interface Props {
  photo: UserPhoto;
  onClose: () => void;
  nextPhoto?: () => void;
  prevPhoto?: () => void;
}

const PhotoModal: React.FC<Props> = ({
  photo,
  onClose,
  prevPhoto,
  nextPhoto,
}) => {
  let date;
  if (photo.createdAt) {
    date = new Date(photo.createdAt);
  }

  return (
    <Main>
      <Photo>
        <Close onClick={onClose}>&times;</Close>
        <Image src={photo.urls.full} alt={photo.description || ''} />
        <Details>
          <Description>{photo.description}</Description>
          {photo.createdAt && date ? (
            <CreatedAt>{`${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`}</CreatedAt>
          ) : null}
        </Details>
        <Buttons>
          <Previous className={!prevPhoto ? 'hide' : ''} onClick={prevPhoto}>
            Prev
          </Previous>
          <Next className={!nextPhoto ? 'hide' : ''} onClick={nextPhoto}>
            Next
          </Next>
        </Buttons>
      </Photo>
    </Main>
  );
};

export default PhotoModal;
