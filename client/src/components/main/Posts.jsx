import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import slugify from 'slugify';
import { format } from 'date-fns';
import InlineEditor from '../slate/InlineEditor';
import {
  savePost,
  listPublicPosts,
  listPosts,
  getOnePublicPost,
  getOnePost
} from '../../redux/actions/postActions';

const Posts = props => {
  const history = useHistory();
  const [count, setCount] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState(getBasicSearchCriteria());

  const { admin, friend, authenticated } = props;

  useEffect(() => {
    (async function () {
      let result;
      if (admin || friend) {
        result = await props.listPosts(getBasicSearchCriteria());
      } else {
        result = await props.listPublicPosts(getBasicSearchCriteria());
      }
      setCount(result.count);
    })();
  }, [admin, friend, authenticated]);

  function save(update) {
    props.savePost(update);
  }

  function goTo(route, state) {
    history.push(route, state)
  }

  async function getPost(post) {
    if (props.admin || props.friend) {
      await props.getOnePost(post.id);
    } else {
      await props.getOnePublicPost(post.id);
    }
    goTo(`/${slugify(post.title, { lower: true })}`);
  }

  async function openSingleEdit(id) {
    if (props.admin || props.friend) {
      await props.getOnePost(id, true);
      goTo('/editor/' + id, { from: history.location.pathname });
    }
  }

  async function nextTenPosts() {
    const plus10 = searchCriteria.take + 10
    if (admin || friend) {
      await props.listPosts({ ...searchCriteria, take: plus10 });
    } else {
      await props.listPublicPosts({ ...searchCriteria, take: plus10 });
    }
    setSearchCriteria({ ...searchCriteria, take: plus10 });
  }

  async function searchByTag(tag) {
    const search = { ...getBasicSearchCriteria(), tags: tag };
    setSearchCriteria(search);
    let result;
    if (admin || friend) {
      result = await props.listPosts(search);
    } else {
      result = await props.listPublicPosts(search);
    }
    setCount(result.count);
  }

  async function searchByUserTag(tag) {
    const search = { ...getBasicSearchCriteria(), tags: tag, byUserTag: true };
    setSearchCriteria(search);
    let result;
    if (admin || friend) {
      result = await props.listPosts(search);
    } else {
      result = await props.listPublicPosts(search);
    }
    setCount(result.count);
  }

  function getBasicSearchCriteria() {
    return {
      skip: 0,
      take: 10,
      orderBy: 'createdAt',
      order: 'desc'
    };
  }

  function deletePost(id) {
    console.log('id in deletePost:::', id);
  }

  function addTag(id) {
    console.log('id in addTag:::', id);
  }

  return (
    <Wrapper>
      {props.posts && props.posts.map((p) => {
        return (
          <Post key={`post-${p.id}`}>
            <MetaData>
              <h2 className="post-title" onClick={() => getPost(p)} style={{ cursor: 'pointer' }}>{p.title}</h2>
              <h4 className="post-subtitle">{p.subtitle}</h4>

              {props.admin && (
                <div className="post-buttons">
                  <button onClick={() => openSingleEdit(p.id)}>
                    <i className="fas fa-external-link-alt" title="open in editor" />
                  </button>
                  <button onClick={() => deletePost(p.id)}>
                    <i className="far fa-trash-alt" title="delete this post" />
                  </button>
                  <button onClick={() => addTag(p.id)}>
                    <i className="fas fa-tag" title="add tag" />
                  </button>
                </div>
              )}
            </MetaData>

            <TagWrapper>
              <h5>{format(new Date(p.createdAt), 'MMM dd, yyyy - hh:mm aaaa')} <span>-</span></h5>
              {
                p.tags.length
                  ? (
                    <Tags>
                      <h4>Tags<span>:</span> </h4>
                      <p>{p.tags.map((t, i) => <span onClick={() => searchByTag(t)} key={`tag-${i}`}>{t}</span>)}</p>
                    </Tags>
                  ) : null
              }
            </TagWrapper>

            <InlineEditor
              post={p}
              save={save}
              isAdmin={props.admin}
              edit={openSingleEdit}
            />

            {
              p.userTags && (
                <Tags userTags>
                  <h4>My Tags<span>:</span> </h4>
                  <p>{p.userTags.map((t, i) => <span onClick={() => searchByUserTag(t)} key={`my-tag-${i}`}>{t}</span>)}</p>
                </Tags>
              )
            }
          </Post>
        )
      })}
      {(count >= searchCriteria.take) && <button onClick={nextTenPosts}>Load More...</button>}
    </Wrapper >
  )
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    friend: state.user.acl === "friend",
    posts: state.posts,
    user: state.user
  }
}

const mapDispatchToState = {
  getOnePost,
  getOnePublicPost,
  listPosts,
  listPublicPosts,
  savePost
};

export default connect(mapPropsToState, mapDispatchToState)(Posts);

const Wrapper = styled.main`
  width: 700px;
  margin: auto;
  padding: 20px 0;
`;

const MetaData = styled.div`
  position: relative;

  .post-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 4px;
  }

  .post-subtitle {
    font-size: .88rem;
    border-bottom: 1px solid ${props => props.theme.mainGrey};
    padding-bottom: 8px;
    margin-bottom: 4px;
    text-indent: 20px;
    color: ${props => props.theme.mainRed};
  }

  .post-buttons {
    position: absolute;
    right: 0;
    top: 8px;

    > button {
      background-color: transparent;
      border: none;
      color: white;
      cursor: pointer;
      margin-right: 4px;
      outline: transparent;
    }
  }
`;

const Post = styled.article`
  margin-bottom: 60px;
`;

const TagWrapper = styled.div`
  display: flex;
  font-size: .68rem;
  margin-bottom: 24px;

  > h5 {
    font-size: .68rem;
    margin-right: 8px;
    padding: 3px 0;
    align-self: flex-start;

    > span {
      color: ${props => props.theme.mainRed};
      padding-left: 8px;
    }
  }
`;

const Tags = styled.div`
  display: flex;
  font-size: .68rem;
  margin-top: ${props => props.userTags && '24px'};

  > h4 {
    padding: 3px 8px 0 3px;
  }

  > p {
    > span {
      background-color: #444;
      border-radius: 3px;
      cursor: pointer;
      display: inline-block;
      margin: 2px;
      padding: 2px 4px;
    }
  }
`;
