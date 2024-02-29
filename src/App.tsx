import { Suspense } from 'react'
import Articles from './components/Articles'
import Loading from './components/Loading'
import AddArticleButton from './components/AddArticleButton'

function App() {
  

  return (
    <>
      <AddArticleButton/>
      <Suspense fallback={<Loading />}>
        <Articles/>
      </Suspense>
    </>
  )
}

export default App
