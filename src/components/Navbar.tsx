import { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/Auth.context';
import { Button, LinkButton } from '../styles/styled-components';
import ProtectedRoute from './ProtectedRoute';

const Navbar = ({title, buttonLink, buttonText}: {
  title: string,
  buttonLink: string,
  buttonText: string
}) => {
  const auth = useContext(AuthContext);

  return (
    <NavbarContainer>
      <NavbarLayout>
        <ProtectedRoute>
          <LinkButton to={buttonLink}>{buttonText}</LinkButton>
        </ProtectedRoute>
        <Title>{title}</Title>
        <Button type='danger' onClick={auth.logout}>Logout</Button>
      </NavbarLayout>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.text_color};
  z-index: 999;
`;

const NavbarLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 10px;
`;

const Title = styled.h3`
  margin: 0;
`;

export default Navbar;