import styled from 'styled-components';
import { Button, LinkButton } from '../styles/styled-components';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth.context';

export default function Navbar({title, buttonLink, buttonText}: {
  title: string,
  buttonLink: string,
  buttonText: string
}) {
  const auth = useContext(AuthContext);

  return (
    <NavbarContainer>
      <LinkButton to={buttonLink}>{buttonText}</LinkButton>
      <Title>{title}</Title>
      <Button type='danger' onClick={auth.logout}>Logout</Button>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: #fff;
  padding: 10px 50px;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Title = styled.h3`
  margin: 0;
`