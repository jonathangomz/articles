import { useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import ArticlesList from './components/ArticlesList'
import Login from './components/Login'
import { AuthContext } from './context/Auth.context'
import AxiosErrorHandler from './services/AxiosErrorHandler'
import { Auth } from './models/Auth.model'
import theme from './styles/theme'

function App() {
  const { user } = useContext<Auth>(AuthContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        {user ? (
          <AxiosErrorHandler>
            <ArticlesList/>
          </AxiosErrorHandler>
        ) : (<Login/>)}
      </ThemeProvider>
    </>
  )
}

export default App
