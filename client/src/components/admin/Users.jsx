import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getBasicSearchCriteria } from '../../utils/halp';

import { adminListUsers } from '../../redux/actions/adminUserActions';

const Users = props => {
  useEffect(() => {
    (function () {
      props.adminListUsers(getBasicSearchCriteria());
    })();
  }, []);

  return (
    <Wrapper>
      Hi there, stupid
      {console.log('props.adminUsers:::', props.adminUsers)}
    </Wrapper>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    adminUsers: state.adminUsers
  }
}

const mapDispatchToState = { adminListUsers };

export default connect(mapPropsToState, mapDispatchToState)(Users);

const Wrapper = styled.div`
  width: 900px;
  margin: auto;
`;
