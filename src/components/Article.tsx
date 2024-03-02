import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { AuthContext } from '../context/Auth.context';
import { instance as axios } from '../services/AxiosErrorHandler';
import { ArticleModel } from '../models/Article';
import Navbar from './Navbar';

export default function Article() {
  const { user } = useContext(AuthContext);
  const { authorId, articleId } = useParams();
  const [article, setArticle] = useState<ArticleModel>();

  useEffect(() => {
    fetchArticle(articleId);
  }, []);

  const fetchArticle = async (articleId: string | undefined) => {
    const {data} = await axios.get(`/articles/${authorId}/${articleId}`,{
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`
      },
    });
    setArticle(data);
  };

  return (
    <>
      <Navbar
        title={article?.title ?? ''}
        buttonLink='/'
        buttonText='Back'
      />

      <Container>
        <div key={article?.id}>
          <ArticleMetadata>
            <p>By: {article?.author}</p>
            <p>{article?.date}</p>
          </ArticleMetadata>
          <Content>
            {article?.content}
          </Content>
        </div>
      </Container>
    </>
  );
}

const Content = styled.p`
  text-align: justify;
`;

const ArticleMetadata = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 10px 10px;
  margin-top: 75px;
`;