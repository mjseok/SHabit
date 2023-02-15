import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { typedUseSelector } from '../../store';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setIsAdminState } from '../../store/authSlice';

const MoveToAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pathName, setPathName] = useState('');
  const isAdmin = typedUseSelector((state) => {
    return state.auth.isAdmin;
  });
  const token = JSON.parse(sessionStorage.getItem('accessToken'));
  const decodedAuth = token && jwt_decode(token).auth;

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);
  useEffect(() => {
    if (!decodedAuth) return navigate('/main');
    if (decodedAuth !== 'ROLE_ADMIN' && isAdmin === false) navigate('/main');
    else dispatch(setIsAdminState(true));
  }, [isAdmin, decodedAuth]);

  return (
    <ButtonContainer>
      <div style={{ visibility: `${isAdmin ? 'visible' : 'hidden'}` }}>
        {pathName.startsWith('/admin') ? (
          <StyledButton onClick={() => navigate('/main')}>
            사용자 모드
          </StyledButton>
        ) : (
          <StyledButton onClick={() => navigate('/admin')}>
            관리자 모드
          </StyledButton>
        )}
      </div>
    </ButtonContainer>
  );
};

export default MoveToAdmin;

const StyledButton = styled.button`
  margin-top: 0.5rem;
  background-color: ${(props) => props.theme.color.darkGrayColor};
  color: ${(props) => props.theme.color.whiteColor};
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};

  &:hover{
    background-color: ${(props) => props.theme.color.primary};
  }
`;

const ButtonContainer = styled.div`
  z-index: 2;
  position: absolute;
  top: 0.5rem;
  right: 6rem;
`;
