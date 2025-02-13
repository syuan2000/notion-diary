import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Inter', sans-serif;
  padding: 0 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 72px;
  margin: 0;
  color: #2d2d2d;
  font-weight: 700;
`;

const Message = styled.p`
  font-size: 18px;
  color: #666;
  margin: 20px 0 30px;
`;

const HomeLink = styled(Link)`
  padding: 10px 20px;
  background-color: #2d2d2d;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color:rgb(137, 137, 137);
    color: white;
    text-decoration: none;
  }
`;

const PageNotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Message>We're sorry, the page you requested could not be found.</Message>
      <HomeLink to="/">Return Home</HomeLink>
    </NotFoundContainer>
  );
};

export default PageNotFound;