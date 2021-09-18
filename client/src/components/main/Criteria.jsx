import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { format } from 'date-fns';
import { listPublicPosts, listPosts } from '../../redux/actions/postActions';
import { setSearchCriteria, setCount } from '../../redux/actions/otherActions';
import { getBasicSearchCriteria } from '../../utils/halp';

const Criteria = props => {
  const [display, setDisplay] = useState({});

  useEffect(() => {
    function setInitialDisplay() {
      const display = {};
      const { title, tags, startDate, endDate, categoryId } = props.criteria;
      if (title) display.title = `Title: ${title.substr(0, 12)}${title.length > 12 ? '...' : ''}`;
      if (tags) {
        const tagsArray = tags.split(',');
        display.tags = tagsArray;
      }
      if (startDate) display.startDate = format(startDate, 'MMM dd, yyyy');
      if (endDate) display.endDate = format(endDate, 'MMM dd, yyyy');
      if (categoryId) {
        const category = props.categories.find(cat => cat.id === parseInt(categoryId))
        display.category = `Category: ${category.name}`;
      }
      setDisplay(display);
    }
    setInitialDisplay();
  }, [props.criteria]);

  function resetSearch() {
    const criteria = getBasicSearchCriteria();
    setDisplay({});
    props.clearSearch();
    props.search(criteria);
  }

  function removeCriteria(criterion) {
    const criteria = { ...props.criteria };
    delete criteria[criterion];
    props.clearSearch(criterion);
    props.setSearchCriteria(criteria);
    props.search(criteria);
  }

  function removeTag(index) {
    let tagsCopy = [...display.tags];
    tagsCopy.splice(index, 1);
    setDisplay({ ...display, tags: tagsCopy });
    const joined = tagsCopy.join(', ');
    const criteria = { ...props.criteria, tags: joined };
    props.clearSearch('tags', joined);
    props.setSearchCriteria(criteria);
    props.search(criteria);
  }

  return (
    <Wrapper>
      {Object.keys(display).length ? (
        <div>
          <button onClick={resetSearch}>reset</button>

          <div>
            {display.title && (
              <p>
                {display.title}
                &nbsp;
                <Remover onClick={() => removeCriteria('title')}>&times;</Remover>
              </p>
            )}

            {display.category && (
              <p>
                {display.category}
                &nbsp;
                <Remover onClick={() => removeCriteria('categoryId')}>&times;</Remover>
              </p>
            )}

            {display.tags && display.tags.length ? (
              <p>
                Tags:
                &nbsp;
                {display.tags.map((tag, i) => (
                  <span key={`search-tag-${tag}`}>
                    {tag} <Remover onClick={() => removeTag(i)}>&times;</Remover>
                  </span>
                ))}
              </p>
            ) : null}

            {display.startDate && (
              <p>
                Start Date:
                &nbsp;
                {format(new Date(display.startDate), 'MMM dd, yyyy')}
                &nbsp;
                <Remover onClick={() => removeCriteria('startDate')}>&times;</Remover>
              </p>
            )}

            {display.endDate && (
              <p>
                End Date:
                &nbsp;
                {format(new Date(display.endDate), 'MMM dd, yyyy')}
                &nbsp;
                <Remover onClick={() => removeCriteria('endDate')}>&times;</Remover>
              </p>
            )}
          </div>
        </div>
      ) : null}
    </Wrapper>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    count: state.count,
    friend: state.user.acl === "friend",
    criteria: state.criteria,
    categories: state.categories
  }
}

const mapDispatchToState = {
  listPosts,
  listPublicPosts,
  setCount,
  setSearchCriteria
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

    > button {
      background: #111;
      border: 1px solid ${props => props.theme.nPurple};
      border-radius: 5px;
      box-shadow: 4px 4px 4px ${props => props.theme.nPurple}77;
      color: ${props => props.theme.nGreen};
      cursor: pointer;
      font-weight: bold;
      margin-right: 16px;
      outline: transparent;
      padding: 4px 8px;
      min-width: 60px;
    }
    
    > div {
      display: flex;
      flex-wrap: wrap;

      > p {
        margin-right: 12px;
        align-self: center;
        font-size: .9rem;
        background-color: #222;
        padding: 3px 6px;
        border-radius: 3px;
      }
    }
  }
`;

const Remover = styled.span`
  cursor: pointer;
  color: ${props => props.theme.nRed};
`;
