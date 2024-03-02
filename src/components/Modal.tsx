import { ReactNode } from 'react';
import styled from 'styled-components';

const Modal = ({ isOpen, children }:{
  isOpen: boolean;
  children: ReactNode
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper>
      <ModalContent>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.bg};
  opacity: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.bg_contrast};
  padding: 20px;
  border-radius: 8px;
`;

export default Modal;