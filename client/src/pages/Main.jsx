import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Bio from '../components/main/Bio';
import Searchbar from '../components/main/Searchbar';
import Posts from '../components/main/Posts';

import { listPublicPosts, listPosts } from '../redux/actions/postActions';
import { setCount, setSearchCriteria } from '../redux/actions/otherActions';
import { getBasicSearchCriteria } from '../utils/halp';

const Main = (props) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [transition, setTransition] = useState('opacity .3s ease-in-out');

  useEffect(() => {
    let visible = false;
    const listener = () => {
      if (window.scrollY > 300 && !visible) {
        setShowScrollButton(true);
        setTransition('opacity .3s ease-in-out');
        visible = true;
      } else if (window.scrollY <= 300 && visible) {
        setShowScrollButton(false);
        setTransition('opacity .3s ease-in-out, visibility .5s ease-in-out .3s');
        visible = false;
      }
    }
    window.addEventListener('scroll', listener);

    return () => window.removeEventListener('scroll', listener);
  }, []);

  async function search(criteria) {
    const search = { ...getBasicSearchCriteria(), ...criteria };
    props.setSearchCriteria(search);
    let result;
    if (props.admin || props.friend) {
      result = await props.listPosts(search);
    } else {
      result = await props.listPublicPosts(search);
    }
    props.setCount(result.count);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <PageWrapper>
      <Header>
        <h1>{props.blog.title}</h1>
        <p>{props.blog.subtitle}</p>
      </Header>

      <Bio />

      <Searchbar search={search} />

      <Posts search={search} />

      <ToTop onClick={scrollToTop} show={showScrollButton} transition={transition}>
        <i className="fas fa-arrow-circle-up" />
      </ToTop>
    </PageWrapper>
  )
}

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    blog: state.blog,
    friend: state.user.acl && state.user.acl.includes('friend')
  }
}

const mapDispatchToState = {
  listPublicPosts,
  listPosts,
  setCount,
  setSearchCriteria
};

export default connect(mapPropsToState, mapDispatchToState)(Main);

const PageWrapper = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
`;

const Header = styled.header`
  margin: auto;
  width: 760px;

  > h1 {
    font-size: 3rem;
    font-weight: 900;
    line-height: 1.8;
  }

  > p {
    font-size: 1.35rem;
    text-indent: 10px;
    color: ${props => props.theme.mainRed};
  }
`;

const ToTop = styled.button`
  background: transparent;
  outline: transparent;
  border: none;
  color: ${props => props.theme.nBlue};
  cursor: pointer;
  font-size: 30px;
  position: fixed;
  bottom: 18px;
  right: 18px;
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  opacity: ${props => props.show ? '1' : '0'};
  transition: ${props => props.transition};
`;
