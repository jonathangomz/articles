import '../models/Article'
import { useState, useEffect, useContext } from 'react'
import { ArticleModel } from '../models/Article'
import { instance as axios } from '../services/AxiosErrorHandler'
import { AuthContext } from '../context/Auth.context'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { FormInput } from '../styles/styled-components'

export default function ArticlesList() {
  const { user } = useContext(AuthContext);
  
  const [articles, setArticles] = useState<ArticleModel[]>([]);
  const [searchType, setSearchType] = useState('title');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchArticles();
  }, [searchText]);

  const fetchArticles = async () => {
    try {
      // If have filter generate the query param
      let query: string | undefined;
      if(searchText) query = `?${searchType}=${searchText}`;

      const {data} = await axios.get(`/articles${(query ?? '')}`,{
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

      <Container>
        <SearchSection>
          <SearchText
            type='text'
            placeholder='Search by title, author or content'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <SelectSearchType
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option selected={searchType === 'author'} value="author">Author</option>
            <option selected={searchType === 'title'} value="title">Title</option>
            <option selected={searchType === 'content'} value="content">Content</option>
          </SelectSearchType>
        </SearchSection>

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
      </Container>
    </>
  );
}

const SearchSection = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`

const SelectSearchType = styled.select`
  border: 1px solid #ffffff21;
  border-radius: 8px;
  padding: 5px;
`

const SearchText = styled(FormInput)`
  width: 100%;
`

const Container = styled.div`
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
