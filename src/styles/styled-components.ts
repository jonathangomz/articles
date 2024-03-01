import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

export const CenterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #131A22;
`

export const Form = styled.form<{max_width?: string}>`
  min-width: 150px;
  max-width: ${({max_width}) => max_width ?? '280px'};
  width: 50%;
`

export const FormItem = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`

export const FormInput = styled.input`
  border: 1px solid #ffffff21;
  border-radius: 8px;
  height: 2em;
  padding: 5px;
`

export const FormButton = styled.button<{ is_loading: boolean }>`
  border: 1px solid #ffffff21;
  margin-top: 10px;
  width: 100%;
  &:hover {
    cursor: ${({ is_loading }) => is_loading ? 'wait' : 'pointer'};
  }
`

export const Button = styled.div<{type?: 'danger'}>`
  border: 1px solid #ffffff21;
  border-radius: 8px;
  background-color: ${({type}) => {
    if(type === 'danger') {
      return 'red';
    } else {
      return 'blue'
    }
  }};
  padding: 5px 10px;
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
`

export const LinkButton = styled(Link)<{type?: 'danger'}>`
  border: 1px solid #ffffff21;
  border-radius: 8px;
  background-color: ${({type}) => {
    if(type === 'danger') {
      return 'red';
    } else {
      return 'blue'
    }
  }};
  padding: 5px 10px;
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
`

export const TextArea = styled.textarea`
  border: 1px solid #ffffff21;
  border-radius: 8px;
  height: 500px;
  width: 100%;
  padding: 5px;
  box-sizing:border-box;
`