import { useState, useContext, FormEvent } from 'react'
import styled from 'styled-components';
import { AuthContext } from '../context/Auth.context';
import { instance as axios } from '../services/AxiosErrorHandler'
import { CenterContainer, Form, FormButton, FormInput, FormItem, TextArea } from '../styles/styled-components';
import Spinner from './Spinner';
import Navbar from './Navbar';
import Modal from './Modal';
import correct from '../assets/correct.svg';

export default function AddArticle() {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement> | undefined) => {
    if(!e) return;

    setIsLoading(true);
    e.preventDefault();
    
    const { status } = await axios.post(`/articles/${user?.username}`, { title, content }, {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    });

    if(status === 201) {
      setOpenModal(true);
      setTimeout(() => setOpenModal(false), 1000);
    }
    setIsLoading(false);
  };


  const validateFields = () => (title.length == 0 || content.length === 0)

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
            <FormInput
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormItem>

          <TextArea
            placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum interdum euismod eros non suscipit. Maecenas at nisl semper, semper sapien at, lobortis erat. Cras hendrerit enim elit, in posuere ligula tempor nec. Sed euismod commodo pellentesque. Nulla rutrum enim sed ipsum facilisis, ut commodo tortor efficitur. Duis dapibus lacus vitae dui vestibulum, vel aliquet odio feugiat. Ut ac ante sit amet odio lacinia sollicitudin nec in mauris. Praesent vel ornare nibh. In hac habitasse platea dictumst. Pellentesque bibendum efficitur metus sit amet maximus. Proin luctus vestibulum quam, eget molestie arcu scelerisque eu. Praesent egestas eros sed neque tempus, ut ullamcorper nisi gravida. Maecenas eu tortor tortor. Maecenas varius et sem eu vehicula. Integer nec semper nisi, quis aliquet ipsum. Phasellus malesuada lacus et urna tincidunt dapibus.'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <FormButton is_loading={isLoading} disabled={isLoading || validateFields()} type='submit'>
            {isLoading ? (<Spinner />) : ('Create')}
          </FormButton>
        </Form>
      </CenterContainer>
      <Modal isOpen={openModal}>
        <Correct src={correct} alt="" />
      </Modal>
    </>
  );
}

const Correct = styled.img`
  width: 24px;
  height: 24px;
`;