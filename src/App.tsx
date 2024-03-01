import { useContext } from 'react'
import ArticlesList from './components/ArticlesList'
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
          <ArticlesList/>
        </AxiosErrorHandler>
      ) : (<Login/>)}
    </>
  )
}

export default App
