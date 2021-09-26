import { useState } from 'react';
import { connect } from 'react-redux';
import { addHours } from 'date-fns';
import Criteria from './Criteria';
import Nav from './Nav';
import SearchForm from './SearchForm';

import { Outer, SearchWrapper } from './styles/navStyles';
import { SearchButtons, MainButton } from '../../styles/components';

import { listPublicPosts, listPosts } from '../../redux/actions/postActions';
import { setSearchCriteria, setCount } from '../../redux/actions/otherActions';

import { getBasicSearchCriteria } from '../../utils/halp';

const Searchbar = props => {
  const [state, setState] = useState({
    categoryId: '',
    tags: '',
    title: '',
    startDate: '',
    endDate: ''
  });
  const [searchProps, setSearchProps] = useState({
    opacity: '0',
    transition: '.2s ease-in-out .3s',
    visibility: 'hidden'
  });

  const [display, setDisplay] = useState('none');

  // If I don't do it this way, i.e. toggle display between 'none' and 'block',
  //  the search form, though set to { visibility: 'hidden' }
  //  will cover the top post below it, and if the post is short enough,
  //  the inlineEditor buttons get covered up and won't work.
  // And no, z-index doesn't help - and I tried putting it everywhere.
  function setDisplayProps(props, display) {
    setSearchProps(props);
    setTimeout(() => setDisplay(display), 350);
  }

  function handleInputChange({ target }) {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  }

  async function search(criteria, event) {
    if (event) event.preventDefault();
    if (!criteria) criteria = getSearchCriteria();
    props.search(criteria);
  }

  function getSearchCriteria() {
    const search = { ...getBasicSearchCriteria() };
    const { tags, title, categoryId, startDate, endDate } = state;
    if (tags) search.tags = tags;
    if (title) search.title = title;
    if (categoryId && categoryId !== "None") search.categoryId = categoryId;
    if (startDate || endDate) {
      search.byDate = true;
      const offset = new Date().getTimezoneOffset();
      if (startDate) {
        const start = addHours(new Date(startDate), (offset / 60));
        search.startDate = start;
      }
      if (endDate) {
        const end = addHours(new Date(endDate), (offset / 60));
        search.endDate = end;
      }
    }
    return search;
  }

  function clearAll() {
    setState({
      categoryId: '',
      tags: '',
      title: '',
      startDate: '',
      endDate: ''
    });
    props.setSearchCriteria(getBasicSearchCriteria());
  }

  function clearSearch(criterion, tags = '') {
    if (!criterion) {
      clearAll();
    } else {
      let newState = { ...state };
      switch (criterion) {
        case 'tags':
          newState.tags = tags;
        case 'title':
          newState.title = '';
        case 'startDate':
          newState.startDate = '';
        case 'endDate':
          newState.endDate = '';
        default:
          newState.categoryId = '';
      }
      setState(newState);
      const criteria = getSearchCriteria();
      delete criteria[criterion];
      props.setSearchCriteria(criteria);
    }
  }

  function cancelSearch(toggleSearch) {
    toggleSearch();
    clearSearch();
  }

  return (
    <Outer>
      <Nav setSearchProps={setDisplayProps}>
        {renderProps => (
          <SearchWrapper {...searchProps} display={display}>
            <SearchForm
              state={state}
              categories={props.categories}
              search={search}
              handleInputChange={handleInputChange}
            />

            <p>leave the end date blank to search from the start date until the present moment</p>
            <p>leave the start date blank to search for everything prior to the end date</p>

            <div className="search-buttons">
              {/* these are called this way to avoid passing the event to the function */}
              <MainButton color="nGreen" onClick={() => search()}>Search</MainButton>
              <MainButton color="nBlue" onClick={() => clearSearch()}>Clear</MainButton>
              <MainButton color="nRed" onClick={() => cancelSearch(renderProps.toggleSearch)}>Cancel</MainButton>
            </div>
          </SearchWrapper>
        )}
      </Nav>

      <Criteria clearSearch={clearSearch} search={search} />
    </Outer>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    friend: state.user.acl && state.user.acl.includes('friend'),
    authenticated: state.auth.authenticated,
    categories: state.categories
  }
}

const mapDispatchToState = {
  listPosts,
  listPublicPosts,
  setCount,
  setSearchCriteria,
};

export default connect(mapPropsToState, mapDispatchToState)(Searchbar);
