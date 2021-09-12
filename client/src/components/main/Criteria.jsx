import { connect } from 'react-redux';
import styled from 'styled-components';
import { listPublicPosts, listPosts } from '../../redux/actions/postActions';
import { setSearch, setCount } from '../../redux/actions/otherActions';
import { getBasicSearchCriteria } from '../../utils/halp';

const Criteria = props => {
  return (
    <Wrapper>
      <div>
        <p>{JSON.stringify(props.search)}</p>
      </div>
    </Wrapper>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    count: state.count,
    friend: state.user.acl === "friend",
    search: state.search
  }
}

const mapDispatchToState = {
  listPosts,
  listPublicPosts,
  setCount,
  setSearch
};

export default connect(mapPropsToState, mapDispatchToState)(Criteria);

const Wrapper = styled.div`
  max-width: 700px;
  margin: 16px auto;
  position: relative;

  > div {
    position: absolute;
    top: 0;
    left: 100px;
    right: 100px;

    p {
      text-align: center;
    }
  }
`;
