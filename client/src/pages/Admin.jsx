import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
import Navbar from "../components/Navbar";
import Blog from '../components/admin/Blog';
import Categories from '../components/admin/Categories';
import Sources from '../components/admin/Sources';
import Users from '../components/admin/Users';
import { MainButton } from '../styles/components';

import { deleteSource, listSources, saveSource } from '../redux/actions/sourceActions';

const Admin = props => {
  const [showing, setShowing] = useState({ ...falsetto(), blog: true });

  function falsetto() {
    return {
      blog: false,
      categories: false,
      cray: false,
      sources: false,
      users: false,
    }
  }

  function toggleView(type) {
    setShowing({ ...falsetto(), [type]: true });
  }


  useEffect(() => {
    (function () {
      if (props.admin) {
        props.listSources();
      }
    })();
  }, []);

  return (
    <Wrapper>
      <Navbar />

      <h1>It's My Admin Page! Yay!</h1>
      <p>Come, let me do admin-y things to you...</p>

      <Main>
        <div className="admin-buttons">
          <MainButton onClick={() => toggleView('blog')} color="nRed">Blog</MainButton>
          <MainButton onClick={() => toggleView('users')} color="nPurple">Users</MainButton>
          <MainButton onClick={() => toggleView('categories')} color="nBlue">Categories</MainButton>
          <MainButton onClick={() => toggleView('sources')} color="nGreen">Sources</MainButton>
          <MainButton onClick={() => toggleView('cray')} color="nYellow">Cray Cray</MainButton>
        </div>

        {/* each of these should show a different component that fetches the relevant data */}
        {showing.blog && <Blog />}

        {showing.categories && <Categories />}

        {/* this will show more than just the form - the form will be there, but hidden until needed, such as when a "create" button is clicked */}
        {showing.sources && <Sources />}

        {showing.users && <Users />}

        {showing.cray && <div>hi there, Crayg!</div>}
      </Main>
    </Wrapper>

  )
}

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    blog: state.blog,
    sources: state.sources
  }
}

const mapDispatchToState = {
  deleteSource,
  listSources,
  saveSource,
};

export default connect(mapPropsToState, mapDispatchToState)(Admin);

const Wrapper = styled.div`
  min-height: 100vh;

  > h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.4;
    text-align: center;
  }

  > p {
    color: ${props => props.theme.mainRed};
    font-size: 1.35rem;
    margin-bottom: 36px;
    text-align: center;
  }
`;

const Main = styled.main`
  margin: auto;
  width: 900px;

  > .admin-buttons {
    background-color: ${props => props.theme.text + '55'};
    border-radius: 8px;
    display: flex;
    justify-content: center;
    margin: auto;
    padding: 12px 12px 14px 12px;
    width: 520px;

    > button:last-child {
      margin-right: 0;
    }
  }
`;