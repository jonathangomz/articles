import { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AxiosError } from 'axios';
import { AuthContext } from '../context/Auth.context';
import { instance as axios } from '../services/AxiosErrorHandler';
import Spinner from './Spinner';
import { Form, CenterContainer, FormButton, FormInput, FormItem } from '../styles/styled-components';

export default function SignUp() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement> | undefined) => {
    if(!e) return;

    // Reset error messages
    setErrorMessages([]);
    setIsLoading(true);
    e.preventDefault();
    
    try {
      const { data } = await axios.post(`/auth/signup`, { username, email, password, confirmPassword });

      if(data && data.access_token) {
        auth.login({ username, token: data.access_token  });
        navigate('/');
      }
    } catch(error) {
      if (error instanceof AxiosError && error.response) {
        setErrorMessages([...error.response.data.message]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CenterContainer>
      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <FormItem>
          <label>Username</label>
          <FormInput
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormItem>

        <FormItem>
          <label>Email</label>
          <FormInput
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormItem>

        <FormItem>
          <label>Password</label>
          <FormInput
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormItem>

        <FormItem>
          <label>Confirm Password</label>
          <FormInput
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormItem>

        <FormButton is_loading={isLoading} disabled={isLoading} type='submit'>
          {isLoading ? (<Spinner />) : ('Sign Up')}
        </FormButton>

        {(errorMessages.length > 0 ?
          errorMessages.map((message) =>
          (<ErrorMessage>*{message}</ErrorMessage>))
          : null
        )}
      </Form>
      <Link to='/login'>Or login</Link>
    </CenterContainer>
  );
};

const ErrorMessage = styled.p`
  font-size: 0.9rem;
  margin: 0;
`;