import { useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/Auth.context';

export const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const AxiosErrorHandler = ({ children }) => {
    const { logout } = useContext(AuthContext);

    

    useEffect(() => {
        const responseInterceptor = instance.interceptors.response.use(response => response, async (error) => {
          if (error.response && error.response.status === 401) {
            logout();
          }
          throw error;
        })

        return () => {
            axios.interceptors.response.eject(responseInterceptor);
        }
    }, [])

    return children
}

export default AxiosErrorHandler