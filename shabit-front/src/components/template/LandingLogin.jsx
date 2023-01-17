import React from 'react';
import styled from 'styled-components';

import LandingContainer from '../molecules/LandingContainer';
import Sidebar from '../organisms/LandingSidebar';
import LandingContent from '../organisms/LandingContent';
import LoginForm from '../organisms/LoginForm';

const LandingLogin = () => {
  return (
    <Wrapper>
      <LandingContainer
        children1={<Sidebar />}
        children2={<LandingContent />}
        children3={<LoginForm />}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default LandingLogin;
