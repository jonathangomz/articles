import { useContext, useState } from 'react';
import { AuthContext } from '../context/Auth.context';
import axios from 'axios';

const Login = () => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
    const { data } = await axios.post(`http://localhost:3000/auth/login`, { username, password });
    auth?.login({ username, token: data.access_token  })
    } catch(ex) {
      console.log('ex:', ex);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username/Email:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;