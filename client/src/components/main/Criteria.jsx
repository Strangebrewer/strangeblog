import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { listPublicPosts, listPosts } from '../../redux/actions/postActions';
import { setSearch, setCount } from '../../redux/actions/otherActions';
import { getBasicSearchCriteria } from '../../utils/halp';

const Criteria = props => {
  const [searchDisplay, setSearchDisplay] = useState({});

  useEffect(() => {
    (function() {
      const search = {};
      const { title, tags, byUserTag, dateRange } = props.search;
      if (title) search.title = `Title: ${title.substr(0, 12)}${title.length > 12 ? '...' : ''}`;
      if (tags) search.tags = tags;
      if (dateRange) search.dateRange = dateRange;
      setSearchDisplay(search);
    })();
  }, [props.search]);

  async function search(criteria) {
    let result;
    if (props.admin || props.friend) {
      result = await props.listPosts(criteria);
    } else {
      result = await props.listPublicPosts(criteria);
    }
    props.setCount(result.count);
  }

  function resetSearch() {
    const criteria = getBasicSearchCriteria();
    props.setSearch(criteria);
    search(criteria);
  }

  function removeCriteria(criterion) {
    console.log('criterion:::', criterion);
    const criteria = { ...props.search };
    delete criteria[criterion];
    props.setSearch(criteria);
    search(criteria);
  }

  return (
    <Wrapper>
      <div>
        <button onClick={resetSearch}>reset</button>
        <p>
          {searchDisplay.title ? <span>{searchDisplay.title}&nbsp;<span style={{ cursor: 'pointer' }} onClick={() => removeCriteria("title")}>&times;</span></span> : null},
          &nbsp;
        </p>
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
