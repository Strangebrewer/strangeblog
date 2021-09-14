import { connect } from 'react-redux';
import styled from 'styled-components';
import { listPublicPosts, listPosts } from '../../redux/actions/postActions';
import { setSearch, setCount } from '../../redux/actions/otherActions';
import { getBasicSearchCriteria } from '../../utils/halp';

const Criteria = props => {
  async function resetSearch() {
    const search = getBasicSearchCriteria();
    props.setSearch(search);
    let result;
    if (props.admin || props.friend) {
      result = await props.listPosts(search);
    } else {
      result = await props.listPublicPosts(search);
    }
    props.setCount(result.count);
  }

  return (
    <Wrapper>
      <div>
        <button onClick={resetSearch}>reset</button>
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
    display: flex;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    p {
      text-align: center;
    }
  }
`;
