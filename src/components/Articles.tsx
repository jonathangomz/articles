import '../models/Article'
import { useState, useEffect } from 'react'
import { ArticleType } from '../models/Article'
import axios from 'axios'

function Articles() {
  
  const [articles, setArticles] = useState<ArticleType[]>([])

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const {data} = await axios.get('http://localhost:3000/articles/jonathangomz',{
        headers: {
          Accept: 'application/json',
        },
      }); // Replace with your API endpoint
      console.log('data', data);
      setArticles(data);

    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  return (
    <div>
      {articles.map((article: ArticleType) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p><strong>Author:</strong> {article.author}</p>
          <p><strong>Date:</strong> {article.date}</p>
          <p>{article.content.substring(0, 70)}{article.content.length > 70 ? '...':''}</p>
        </div>
      ))}
    </div>
  );
}

export default Articles
