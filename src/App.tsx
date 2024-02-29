import { Suspense, useContext } from 'react'
import Articles from './components/Articles'
import Loading from './components/Loading'
import AddArticleButton from './components/AddArticleButton'
import Login from './components/Login'
import { AuthContext } from './context/Auth.context'
import { Auth } from './models/Auth.model'

function App() {
  const { user } = useContext<Auth>(AuthContext);

  return (
    <div>
      {user ? (
      <div>
        <AddArticleButton/>
        <Suspense fallback={<Loading />}>
          <Articles/>
        </Suspense>
      </div>) : (<Login/>)}
    </div>
  )
}

export default App
