import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../context/Auth.context'
import { instance as axios } from '../services/AxiosErrorHandler'
import { ArticleModel } from '../models/Article'
import { FormInput } from '../styles/styled-components'
import Navbar from './Navbar'

export default function ArticlesList() {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState<ArticleModel[]>([]);
  const [searchType, setSearchType] = useState('title');
  const [searchText, setSearchText] = useState('');

  // Effect used to update the articles list on searchText update
  useEffect(() => {
    fetchArticles();
  }, [searchText]);

  const fetchArticles = async () => {
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
  };

  return (
    <>
      <Navbar
        title='Articles'
        buttonLink='/article'
        buttonText='New Article'
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
            defaultValue={searchType}
          >
            <option value='author'>Author</option>
            <option value='title'>Title</option>
            <option value='content'>Content</option>
          </SelectSearchType>
        </SearchSection>

        {articles.map((article: ArticleModel) => (
          <ArticleContainer key={article.id} to={`article/${article.author}/${article.id}`}>
            <ArticleTitle>{article.title}</ArticleTitle>
            <ArticleMetadata>
              <Metadata>By: {article.author}</Metadata>
              <Metadata>{article.date}</Metadata>
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
`;

const SelectSearchType = styled.select`
  border: 1px solid #ffffff21;
  border-radius: 8px;
  padding: 5px;
`;

const SearchText = styled(FormInput)`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 10px 10px;
  margin-top: 75px;
`;

const ArticleContainer = styled(Link)`
  color: ${props => props.theme.text_color_contrast};
  background-color: ${props => props.theme.bg_contrast};;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const ArticleTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 8px;
`;

const ArticleMetadata = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Metadata = styled.p`
  font-size: 0.8rem;
  margin: 0;
`;

const ArticleContent = styled.p`
  font-size: 1rem;
  margin-top: 16px;
`;