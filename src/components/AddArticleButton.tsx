import { Link, Route } from 'react-router-dom';
import '../models/Article'

function AddArticleButton() {
  return (
    <div>
      <Link to="createArticle">Create a new Article</Link>
    </div>
  );
}

export default AddArticleButton
