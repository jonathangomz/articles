import '../models/Article'
import { useContext } from 'react';
import { AuthContext } from '../context/Auth.context';

function LogoutButton() {
  const auth = useContext(AuthContext);

  return (
    <div onClick={auth.logout}>
      <p>Logout</p>
    </div>
  );
}

export default LogoutButton
