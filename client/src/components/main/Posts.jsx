import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import slugify from 'slugify';
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

  const { admin, friend, authenticated } = props;

  useEffect(() => {
    (async function () {
      if (admin || friend) {
        props.listPosts();
      } else {
        props.listPublicPosts();
      }
    })();
  }, [admin, friend, authenticated]);

  function save(update) {
    console.log('update:::', update);
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

  return (
    <Wrapper>
      {props.posts && props.posts.map((p) => {
        return (
          <Post key={`post-${p.id}`}>
            <div style={{ display: 'flex' }}>
              <h2 onClick={() => getPost(p)} style={{ cursor: 'pointer' }}>{p.title}</h2>
              {props.admin && <span><button onClick={() => openSingleEdit(p.id)}><i className="fas fa-external-link-alt" /></button></span>}
            </div>
            <h4>{p.subtitle}</h4>
            <p>{p.createdAt}</p>
            <InlineEditor
              post={p}
              save={save}
              isAdmin={props.admin}
              edit={openSingleEdit}
            />
          </Post>
        )
      })}
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
  > div > h2 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 4px;
  }

  > h4 {
    font-size: 14px;
    border-bottom: 1px solid grey;
    padding-bottom: 8px;
    margin-bottom: 4px;
    text-indent: 20px;
  }

  > p {
    font-size: 10px;
    margin-bottom: 12px;
  }
`;