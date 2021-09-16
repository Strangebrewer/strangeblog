import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { listPublicPosts, listPosts } from '../../redux/actions/postActions';
import { setSearch, setCount } from '../../redux/actions/otherActions';
import { getBasicSearchCriteria } from '../../utils/halp';

const Criteria = props => {
  const [searchDisplay, setSearchDisplay] = useState({});

  useEffect(() => {
    (function () {
      const display = {};
      const { title, tags, byUserTag, dateRange, categoryId } = props.search;
      if (title) display.title = `Title: ${title.substr(0, 12)}${title.length > 12 ? '...' : ''}`;
      if (tags) display.tags = tags;
      if (dateRange) display.dateRange = dateRange;
      if (categoryId) {
        const category = props.categories.find(cat => cat.id === parseInt(categoryId))
        display.category = category.name;
      }
      setSearchDisplay(display);
    })();
  }, [props.search]);

  async function searchPosts(criteria) {
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
    setSearchDisplay({});
    props.clearSearch();
    searchPosts(criteria);
  }

  function removeCriteria(criterion) {
    const criteria = { ...props.search };
    delete criteria[criterion];
    props.clearSearch(criterion);
    props.setSearch(criteria);
    searchPosts(criteria);
  }

  return (
    <Wrapper>
      {Object.keys(searchDisplay).length ? <div>
        <button onClick={resetSearch}>reset</button>
        <p>
          {searchDisplay.title ? <span>{searchDisplay.title}&nbsp;<span style={{ cursor: 'pointer' }} onClick={() => removeCriteria("title")}>&times;</span></span> : null}
          &nbsp;
          {searchDisplay.category ? <span>Category: {searchDisplay.category}&nbsp;<span style={{ cursor: 'pointer' }} onClick={() => removeCriteria("categoryId")}>&times;</span></span> : null}
        </p>
      </div> : null}
    </Wrapper>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    count: state.count,
    friend: state.user.acl === "friend",
    search: state.search,
    categories: state.categories
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
