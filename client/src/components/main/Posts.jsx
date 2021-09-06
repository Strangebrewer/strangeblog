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
  const [take, setTake] = useState(10);
  const [count, setCount] = useState(0);

  const { admin, friend, authenticated } = props;

  useEffect(() => {
    (async function () {
      let result;
      if (admin || friend) {
        result = await props.listPosts({ skip: 0, take, orderBy: 'updatedAt', order: 'desc' });
      } else {
        result = await props.listPublicPosts({ skip: 0, take, orderBy: 'updatedAt', order: 'desc', tags: 'advaita' });
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
    const plus10 = take + 10
    if (admin || friend) {
      props.listPosts({ skip: 0, take: plus10, orderBy: 'updatedAt', order: 'desc' });
    } else {
      props.listPublicPosts({ skip: 0, take: plus10, orderBy: 'updatedAt', order: 'desc', tags: 'advaita' });
    }
    setTake(plus10);
  }

  return (
    <Wrapper>
      {props.posts && props.posts.map((p) => {
        return (
          <Post key={`post-${p.id}`}>
            <div style={{ display: 'flex' }}>
              <h2 className="post-title" onClick={() => getPost(p)} style={{ cursor: 'pointer' }}>{p.title}</h2>
              {props.admin && <span><button onClick={() => openSingleEdit(p.id)}><i className="fas fa-external-link-alt" /></button></span>}
            </div>
            <h4 className="post-subtitle">{p.subtitle}</h4>
            <p className="post-date">{format(new Date(p.createdAt), 'MMM dd, yyyy - hh:mm aaaa')}</p>
            <InlineEditor
              post={p}
              save={save}
              isAdmin={props.admin}
              edit={openSingleEdit}
            />
          </Post>
        )
      })}
      {(count >= take) && <button onClick={nextTenPosts}>Load More...</button>}
    </Wrapper>
  )
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    friend: state.user.acl === "friend",
    posts: state.posts
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

const Post = styled.article`
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

  .post-date {
    font-size: .68rem;
    margin-bottom: 12px;
  }
`;