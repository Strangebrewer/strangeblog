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
  const [showModeButtons, setShowModeButtons] = useState(true);
  const [transition, setTransition] = useState('opacity .3s ease-in-out');

  useEffect(() => {
    let scrollBtnVisible = false;
    let modeBtnsVisible = true;
    const listener = () => {
      if (window.scrollY > 300) {
        if (!scrollBtnVisible) {
          setShowScrollButton(true);
          setTransition('opacity .3s ease-in-out');
          scrollBtnVisible = true;
        }
        if (modeBtnsVisible) {
          setShowModeButtons(false);
          modeBtnsVisible = false;
        }
      } else if (window.scrollY <= 300) {
        if (scrollBtnVisible) {
          setShowScrollButton(false);
          setTransition('opacity .3s ease-in-out, visibility .5s ease-in-out .3s');
          scrollBtnVisible = false;
        }
        if (!modeBtnsVisible) {
          setShowModeButtons(true);
          modeBtnsVisible = true;
        }
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
      {showModeButtons && (
        <Modebuttons night={props.mode === 'night'}>
          {props.mode === 'bright' && (
            <button onClick={() => props.toggleMode('night')}>
              <i className="fas fa-moon" />
            </button>
          )}
          {props.mode === 'night' && (
            <button onClick={() => props.toggleMode('bright')}>
              <i className="fas fa-sun" />
            </button>
          )}
        </Modebuttons>
      )}
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
    color: ${props => props.theme.mainRed};
    font-size: 1.35rem;
    text-indent: 10px;
  }
`;

const ToTop = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.nBlue};
  cursor: pointer;
  font-size: 30px;
  opacity: ${props => props.show ? '1' : '0'};
  outline: transparent;
  position: fixed;
  bottom: 18px;
  right: 18px;
  transition: ${props => props.transition};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
`;

const Modebuttons = styled.div`
  position: fixed;
  top: 10px;
  right: 5px;

  > button {
    background-color: transparent;
    border: none;
    color: ${props => props.night ? props.theme.nOrange : props.theme.nBlue};
    cursor: pointer;
    font-size: 1.3rem;
    outline: transparent;
  }
`;
