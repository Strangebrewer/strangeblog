import { useEffect } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
import Navbar from "../components/Navbar";
import SourceForm from '../components/admin/SourceForm';

import { deleteSource, listSources, save } from '../redux/actions/sourceActions';

const Admin = props => {
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
      
      <Main>
        <h1>Welcome to the Admin page, sucka!</h1>
        <SourceForm />
      </Main>
    </Wrapper>

  )
}

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    blog: state.blog,
    sources: state.sources
  }
}

const mapDispatchToState = {
  deleteSource,
  listSources,
  save, Navbar
};

export default connect(mapPropsToState, mapDispatchToState)(Admin);

const Wrapper = styled.div`
  min-height: 100vh;
  color: white;
`;

const Main = styled.main`
  width: 900px;
  margin: auto;
`;