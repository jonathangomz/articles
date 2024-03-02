import { FormEvent, useContext, useState } from 'react';
import styled from "styled-components"
import { AuthContext } from '../context/Auth.context';
import { instance as axios } from '../services/AxiosErrorHandler';
import Spinner from './Spinner';

export default function Login() {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement> | undefined) => {
    if(!e) return;

    setIsLoading(true);
    e.preventDefault();
    
    const { data } = await axios.post(`/auth/login`, { username, password });
    auth?.login({ username, token: data.access_token  });

    setIsLoading(false);
  };

  return (
    <CenterContainer>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <FormItem>
          <label>Username:</label>
          <FormInput
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <label>Password:</label>
          <FormInput
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormItem>
        <FormButton is_loading={isLoading} disabled={isLoading} type='submit'>
          {isLoading ? (<Spinner />) : ('Login')}
        </FormButton>
      </Form>
    </CenterContainer>
  );
};

const CenterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #131A22;
`;

const Form = styled.form`
  min-width: 150px;
  max-width: 280px;
  width: 50%;
`;

const FormItem = styled.div`
  background-color: #131A22;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  border: 1px solid #ffffff21;
  border-radius: 8px;
  height: 2em;
`;

const FormButton = styled.button<{ is_loading: boolean }>`
  border: 1px solid #ffffff21;
  margin-top: 10px;
  width: 100%;
  &:hover {
    cursor: ${({ is_loading }) => is_loading ? 'wait' : 'pointer'};
  }
`;