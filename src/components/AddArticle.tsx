import '../models/Article'
import { useState, useContext } from 'react'
import axios from 'axios'
import { CreateArticle } from '../models/CreateArticle.model';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Auth.context';

function AddArticle() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [articleData, setArticleData] = useState<CreateArticle>({
    title: '',
    content: ''
  });

  const createArticles = async () => {
    try {
      setLoading(true);
      console.log('articleData', articleData);

      const { data } = await axios.post(`http://localhost:3000/articles/${user?.username}`, articleData); // Replace with your API endpoint
      
      console.log('data', data);
    } catch (error) {
      console.error('Error creating the article:', error);
    } finally {
      setLoading(true);
    }
  };

  return (
    <div>
      <p>Create a new Article</p>

      <input type='text' placeholder='Title' value={articleData.title} onChange={(event) => setArticleData({...articleData, title: event.currentTarget.value})}></input>
      <input type='text' placeholder='Content' value={articleData.content} onChange={(event) => setArticleData({...articleData, content: event.currentTarget.value})}></input>

      <div onClick={createArticles}>
        <p>Create</p>
      </div>

      <Link to='/'>Back</Link>

    </div>
  );
}

export default AddArticle
