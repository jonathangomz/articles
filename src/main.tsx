import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import AddArticle from './components/AddArticle';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "createArticle",
    element: <AddArticle/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
