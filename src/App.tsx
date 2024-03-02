import { ThemeProvider } from 'styled-components'
import ArticlesList from './components/ArticlesList'
import AxiosErrorHandler from './services/AxiosErrorHandler'
import theme from './styles/theme'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ProtectedRoute>
          <AxiosErrorHandler>
            <ArticlesList/>
          </AxiosErrorHandler>
        </ProtectedRoute>
      </ThemeProvider>
    </>
  )
}

export default App
