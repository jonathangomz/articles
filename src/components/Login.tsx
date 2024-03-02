import { FormEvent, useContext, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth.context';
import { instance as axios } from '../services/AxiosErrorHandler';
import Spinner from './Spinner';
import { CenterContainer, FormButton, FormInput, FormItem } from '../styles/styled-components';

export default function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement> | undefined) => {
    if(!e) return;

    setIsLoading(true);
    e.preventDefault();
    
    const { data } = await axios.post(`/auth/login`, { username, password });

    if(data && data.access_token) {
      auth.login({ username, token: data.access_token  });
      navigate('/');
    }

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