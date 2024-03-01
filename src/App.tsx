import { useContext } from 'react'
import Articles from './components/Articles'
import Login from './components/Login'
import { AuthContext } from './context/Auth.context'
import { Auth } from './models/Auth.model'
import AxiosErrorHandler from './services/AxiosErrorHandler'

function App() {
  const { user } = useContext<Auth>(AuthContext);

  return (
    <>
      {user ? (
        <AxiosErrorHandler>
          <Articles/>
        </AxiosErrorHandler>
      ) : (<Login/>)}
    </>
  )
}

export default App
