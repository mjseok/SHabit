import React from 'react';
import { useSelector } from 'react-redux';
import { AiFillNotification } from 'react-icons/ai';
import styled from 'styled-components';

export default function StretchContent() {
  const videoURL = useSelector((state) => {
    let url = state.video.videoURL + `?autoplay=1&mute=1`;
    return url;
  });

  return (
    <>
      <InfoBox>
        <AiFillNotification />
        영상을 보고 따라해보세요.
      </InfoBox>
      <Video title="stretch video" src={videoURL} width="515" height="290" />
    </>
  );
}

const InfoBox = styled.div`
  width: 45rem;
  height: 3rem;
  background-color: ${(props) => props.theme.color.secondary};
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  border-radius: 1rem;
  font-weight: bold;
  padding: 1rem;
  display: flex;
  align-items: center;

  & > svg {
    color: ${(props) => props.theme.color.primary};
    margin-right: 1rem;
  }
`;

const Video = styled.iframe`
  border-radius: 1rem;
`;
