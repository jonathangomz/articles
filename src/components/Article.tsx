import { useContext, useEffect, useState } from 'react';
import '../models/Article'
import { useParams } from 'react-router-dom'
import { instance as axios } from '../services/AxiosErrorHandler';
import { AuthContext } from '../context/Auth.context';
import { ArticleModel } from '../models/Article';

function Article() {
  const { user } = useContext(AuthContext);
  const { authorId, articleId } = useParams();
  const [article, setArticle] = useState<ArticleModel>();

  useEffect(() => {
    fetchArticle(articleId);
  }, []);

  const fetchArticle = async (articleId: string | undefined) => {
    try {
      const {data} = await axios.get(`/articles/${authorId}/${articleId}`,{
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user?.token}`
        },
      }); // Replace with your API endpoint
      console.log('data', data);
      setArticle(data);

    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  return (
      <div key={article?.id}>
        <h2>{article?.title}</h2>
        <p><strong>Author:</strong> {article?.author}</p>
        <p><strong>Date:</strong> {article?.date}</p>
        <p>{article?.content}</p>
    </div>
  );
}

export default Article
