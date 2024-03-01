import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddArticle from './components/AddArticle';
import Login from './components/Login.tsx';
import { AuthProvider } from './context/Auth.context.tsx';
import Article from './components/Article.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "article",
    element: <AddArticle/>,
  },
  {
    path: "article/:authorId/:articleId",
    element: <Article/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
