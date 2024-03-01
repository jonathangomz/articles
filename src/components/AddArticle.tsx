import '../models/Article'
import { useState, useContext } from 'react'
import { instance as axios } from '../services/AxiosErrorHandler'
import { AuthContext } from '../context/Auth.context';
import { CenterContainer, Form, FormButton, FormInput, FormItem, TextArea } from '../styles/styled-components';
import Spinner from './Spinner';
import Navbar from './Navbar';

function AddArticle() {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    
    try {
      const { status } = await axios.post(`/articles/${user?.username}`, { title, content }, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      }); 

      if(status === 201) {
        // Everything is ok
      }
    } catch(ex) {
      throw ex;
    } finally {
      setIsLoading(false);
    }
  };


  const validateFields = () => (title.length === 0 && content.length === 0)

  return (
    <>
      <Navbar
        title='Create a new Article'
        buttonLink='/'
        buttonText='Back'
      />

      <CenterContainer>
        <Form max_width='initial' onSubmit={handleSubmit}>
          <FormItem>
            <label>Title</label>
            <FormInput
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormItem>

          <TextArea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <FormButton is_loading={isLoading} disabled={isLoading || validateFields()} type="submit">
            {isLoading ? (<Spinner />) : ('Create')}
          </FormButton>
        </Form>
      </CenterContainer>
    </>
  );
}

export default AddArticle
