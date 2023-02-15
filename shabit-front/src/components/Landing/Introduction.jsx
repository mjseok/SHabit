import React from 'react';
import styled from 'styled-components';

import Logo from '../common/Logo';

import { TbArrowBigRightLine } from 'react-icons/tb';

import { loadEffect } from '../../styles/animation';

const Introduction = () => {
  return (
    <ContentWrapper>
      <WelcomeWrapper>
        <span>Welcome to</span>
        <Logo size={'lg'} />
      </WelcomeWrapper>
      <ImgWrapper>
        <Img src={'/assets/posture-bad.png'} alt="bad posture" />
        <TbArrowBigRightLine />
        <Img src={'/assets/posture-good.png'} alt="good posture" />
      </ImgWrapper>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  animation: 0.8s ease-in ${loadEffect.down};
`;

const WelcomeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.color.whiteColor};
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    color: ${(props) => props.theme.color.whiteColor};
    animation: 1.2s ease-in ${loadEffect.right};
    font-size: 3rem;
  }
`;

const Img = styled.img`
  width: 9rem;
  margin: 0 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.2rem ${(props) => props.theme.color.grayColor};
`;
export default Introduction;
