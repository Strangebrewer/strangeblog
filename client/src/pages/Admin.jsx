import { useEffect } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
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
      <h1>Welcome to the Admin page, sucka!</h1>
      {console.log('props.sources:::', props.sources)}
      <SourceForm />
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
  save,
};

export default connect(mapPropsToState, mapDispatchToState)(Admin);

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: black;
  color: white;
`;
