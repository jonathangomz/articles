import '../models/Article'
import { useState, useEffect, useContext } from 'react'
import { ArticleModel } from '../models/Article'
import { instance as axios } from '../services/AxiosErrorHandler'
import { AuthContext } from '../context/Auth.context'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

function Articles() {
  const [articles, setArticles] = useState<ArticleModel[]>([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const {data} = await axios.get('/articles',{
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user?.token}`
        },
      });
      setArticles(data);

    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  return (
    <>
      <Navbar
              title='Articles'
              buttonLink='/article'
              buttonText='Create a new Article'
            />

      <ArticlesList>
        {articles.map((article: ArticleModel) => (
          <ArticleContainer key={article.id} to={`article/${article.author}/${article.id}`}>
            <ArticleTitle>{article.title}</ArticleTitle>
            <ArticleMetadata>
              <ArticleAuthor>By: {article.author}</ArticleAuthor>
              <ArticleDate>{article.date}</ArticleDate>
            </ArticleMetadata>
            <ArticleContent>{article.content.substring(0, 70)}{article.content.length > 70 ? '...':''}</ArticleContent>
          </ArticleContainer>
        ))}
      </ArticlesList>
    </>
  );
}


const ArticlesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 10px 10px;
  margin-top: 75px;
`;

const ArticleContainer = styled(Link)`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const ArticleTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 8px;
`;

const ArticleMetadata = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArticleAuthor = styled.p`
  color: #666;
  font-size: 1rem;
  margin: 0;
`;

const ArticleDate = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
`;

const ArticleContent = styled.p`
  color: #333;
  font-size: 1rem;
  margin-top: 16px;
`;

export default Articles
