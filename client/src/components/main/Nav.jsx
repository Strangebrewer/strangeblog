import { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addHours } from 'date-fns';
import Criteria from './Criteria';

import { logout } from '../../redux/actions/authActions';
import { listPublicPosts, listPosts } from '../../redux/actions/postActions';
import { setSearch, setCount } from '../../redux/actions/otherActions';
import { getBasicSearchCriteria } from '../../utils/halp';

const Nav = props => {
  const history = useHistory();
  const [categoryId, setCategoryId] = useState('');
  const [searchHeight, setSearchHeight] = useState('56px');
  const [searchWidth, setSearchWidth] = useState('260px');
  const [transition, setTransition] = useState('max-width .2s ease-in-out, height .3s ease-in-out .06s');
  const [opacity, setOpacity] = useState('0');
  const [opacityTransition, setOpacityTransition] = useState('.2s ease-in-out .25s');
  const [visibility, setVisiblity] = useState('hidden');
  const [shadow, setShadow] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  // inputs
  const [tags, setTags] = useState('');
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  function toggleSearch() {
    if (showSearch === true) {
      setTransition('max-width .2s ease-in-out .18s, height .3s ease-in-out, box-shadow .2s ease-in-out .15s');
      setSearchHeight("56px");
      setSearchWidth("260px");
      setOpacity('0');
      setVisiblity('hidden');
      setOpacityTransition('.15s ease-in-out');
      setShadow(null);
      setShowSearch(false);
    } else {
      setTransition('max-width .2s ease-in-out, height .3s ease-in-out .1s, box-shadow .2s ease-in-out .12s')
      setSearchHeight("420px");
      setSearchWidth("500px");
      setOpacity('1');
      setVisiblity('visible');
      setOpacityTransition('.2s ease-in-out .28s');
      setShadow(true);
      setShowSearch(true);
    }
  }

  function handleSelectChange(e) {
    const { value } = e.target;
    setCategoryId(value);
    let criteria;
    if (!showSearch) {
      criteria = { ...getBasicSearchCriteria() };
      if (value !== "None") {
        criteria.categoryId = value;
        const category = props.categories.find(cat => cat.id === parseInt(value));
        criteria.category = category.name;
      }
      search(criteria);
      props.setSearch(criteria);
    }
  }

  function handleInputChange({ target }) {
    const { name, value } = target;
    if (name === 'tags') setTags(value);
    if (name === 'title') setTitle(value);
    if (name === 'startDate') setStartDate(value);
    if (name === 'endDate') setEndDate(value);
  }

  function goTo(route, state) {
    history.push(route, state);
  }

  async function search(criteria) {
    if (!criteria) criteria = getSearchCriteria();
    props.setSearch(criteria);
    let result;
    if (props.admin || props.friend) {
      result = await props.listPosts(criteria);
    } else {
      result = await props.listPublicPosts(criteria);
    }
    props.setCount(result.count);
  }

  function getSearchCriteria() {
    const search = { ...getBasicSearchCriteria() };
    if (tags) search.tags = tags;
    if (title) search.title = title;
    if (categoryId && categoryId !== "None")
      search.categoryId = categoryId;
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
    setTags('');
    setTitle('');
    setStartDate('');
    setEndDate('');
    setCategoryId('None');
    setSearch(getBasicSearchCriteria());
  }

  function clearSearch(criterion, tags = '') {
    if (!criterion) {
      clearAll();
    } else {
      switch (criterion) {
        case 'tags':
          setTags(tags);
          break;
        case 'title':
          setTitle('');
          break;
        case 'startDate':
          setStartDate('');
          break;
        case 'endDate':
          setEndDate('');
          break;
        default:
          setCategoryId('None');
          break;
      }
      const criteria = getSearchCriteria();
      delete criteria[criterion];
      setSearch(criteria);
    }
  }

  function cancelSearch() {
    toggleSearch();
    clearSearch();
  }

  return (
    <Outer>
      <Wrapper height={searchHeight} width={searchWidth} transition={transition} shadow={shadow}>
        <div className="nav-buttons">
          <button onClick={toggleSearch} title="toggle search">
            <i className="fas fa-search" />
          </button>
          {props.admin && <button onClick={() => goTo('/editor')} title="new post">
            <i className="fas fa-plus" />
          </button>}
          {props.authenticated
            ? (
              <button onClick={props.logout} title="logout">
                <i className="fas fa-sign-out-alt" />
              </button>
            ) : (
              <button onClick={() => goTo('/login')} title="login">
                <i className="fas fa-sign-in-alt" />
              </button>
            )}
        </div>

        <SearchWrapper
          opacity={opacity}
          visibility={visibility}
          transition={opacityTransition}
        >
          <div className="title-search">
            <label>by Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
            />
          </div>

          <div className="tag-category-wrapper">
            <div className="tag-search">
              <label>by Tags:</label>
              <input
                type="text"
                name="tags"
                value={tags}
                onChange={handleInputChange}
              />
              <p>separate tags with commas</p>
            </div>

            <div className="category-search">
              <label>by Category:</label>
              <select name="category" onChange={handleSelectChange} value={categoryId}>
                <option value="None">None</option>
                {props.categories.map((c, i) => {
                  if (c.name !== 'None')
                    return <option key={`cat-${i}`} value={c.id}>{c.name}</option>
                })}
              </select>
            </div>
          </div>

          <div className="date-search">
            <label>by Date:</label>

            <div className="date-inputs">
              <div className="start-date">
                <label>start:</label>
                <input
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="end-date">
                <label>end:</label>
                <input
                  type="date"
                  name="endDate"
                  value={endDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <p>leave the end date blank to search from the start date until the present moment</p>
          <p>leave the start date blank to search for everything prior to the end date</p>

          <div className="search-buttons">
            {/* search and clearSearch below are called this way to avoid passing the event to the function */}
            <button onClick={() => search()}>Search</button>
            <button onClick={() => clearSearch()}>Clear</button>
            <button onClick={cancelSearch}>Cancel</button>
          </div>
        </SearchWrapper>
      </Wrapper>

      <Criteria clearSearch={clearSearch} />
    </Outer>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    friend: state.user.acl === 'friend',
    authenticated: state.auth.authenticated,
    categories: state.categories
  }
}

const mapDispatchToState = {
  listPosts,
  listPublicPosts,
  logout,
  setCount,
  setSearch,
};

export default connect(mapPropsToState, mapDispatchToState)(Nav);

const Outer = styled.div`
  width: 700px;
  margin: 0 auto 30px auto;
  padding: 30px 0 16px 0;
`;

const Wrapper = styled.nav`
  background-color: #ffffff22;
  border-radius: 12px;
  ${props => props.shadow && 'box-shadow: 0 0 4px #ffffff'};
  height: ${props => props.height};
  margin: 0 auto;
  max-width:  ${props => props.width};
  padding: 16px 0;
  transition: ${props => props.transition};

  .nav-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;

    > button {
      background: transparent;
      border: 1px solid ${props => props.theme.mainRed};
      border-radius: 5px;
      box-shadow: 0px 0px 8px ${props => props.theme.mainRed}77;
      color: ${props => props.theme.nBlue};
      cursor: pointer;
      font-weight: bold;
      margin: 0 12px;
      outline: transparent;
      height: 26px;
      min-width: 50px;
      display: flex;
      > i {
        display: block;
        align-self: center;
        margin: auto;
      }
    }

    > button:first-of-type {
      margin-left: 0;
    }

    > button:last-of-type {
      margin-right: 0;
    }
  }
`;

const SearchWrapper = styled.div`
  visibility: ${props => props.visiblity};
  opacity: ${props => props.opacity};
  transition: opacity ${props => props.transition};
  padding: 12px 40px;

  input, select {
    height: 32px;
    padding: 4px 8px;
    border-radius: 4px;
    border: 2px solid ${props => props.theme.mainRed};
    box-shadow: inset 3px 3px 2px #777,
      inset -3px -3px 2px #fff;
    background-color: #ccc;
    color: ${props => props.theme.nBlue};
    font-weight: 700;
    outline: transparent;
  }

  label, input, select {
    width: 100%;
    display: block;
    margin-bottom: 6px;
  }

  p {
    font-size: .7rem;
    margin: 4px auto;
    padding: 0 12px;
  }

  .title-search {
    margin-bottom: 12px;
  }

  .tag-category-wrapper {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;

    .tag-search, .category-search {
      width: 48%;
    }
  }

  .date-search {
    .date-inputs {
      margin-top: 4px;
      display: flex;
      justify-content: space-between;
      padding: 0 12px;

      .start-date, .end-date {
        width: 48%;
      }
    }
  }

  .search-buttons {
    display: flex;
    width: 280px;
    justify-content: space-between;
    margin: 30px auto 0 auto;

    > button {
      background: #111;
      border: 1px solid ${props => props.theme.nGreen};
      border-radius: 5px;
      box-shadow: 4px 4px 4px ${props => props.theme.nGreen}77;
      color: ${props => props.theme.nGreen};
      cursor: pointer;
      font-weight: bold;
      margin-right: 16px;
      outline: transparent;
      padding: 6px 12px;
      min-width: 80px;
    }

    > button:nth-child(2) {
      border: 1px solid ${props => props.theme.nBlue};
      box-shadow: 4px 4px 4px ${props => props.theme.nBlue}77;
      color: ${props => props.theme.nBlue};
    }

    > button:last-of-type {
      border: 1px solid ${props => props.theme.nRed};
      box-shadow: 4px 4px 4px ${props => props.theme.nRed}77;
      color: ${props => props.theme.nRed};
      margin-right: 0;
    }
  }
`;