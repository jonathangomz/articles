import { useContext, useState } from 'react';
import { AuthContext } from '../context/Auth.context';
import styled, { keyframes } from "styled-components"
import { instance as axios } from '../services/AxiosErrorHandler';

const Login = () => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    
    try {
    const { data } = await axios.post(`/auth/login`, { username, password });
    auth?.login({ username, token: data.access_token  })
    } catch(ex) {
      console.log('ex:', ex);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CenterContainer>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <FormItem>
          <label>Username:</label>
          <FormInput
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <label>Password:</label>
          <FormInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormItem>
        <FormButton is_loading={isLoading} disabled={isLoading} type="submit">
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
`

const Form = styled.form`
  min-width: 150px;
  max-width: 280px;
  width: 50%;
`

const FormItem = styled.div`
  background-color: #131A22;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`

const FormInput = styled.input`
  border: 1px solid #ffffff21;
  border-radius: 8px;
  height: 2em;
`

const FormButton = styled.button<{ is_loading: boolean }>`
  border: 1px solid #ffffff21;
  margin-top: 10px;
  width: 100%;
  &:hover {
    cursor: ${({ is_loading }) => is_loading ? 'wait' : 'pointer'};
  }
`

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`

const Spinner = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: 24px;
  height: 24px;
`

const Circle = styled.circle`
  stroke: #ffffff21;
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
`


export default Login;