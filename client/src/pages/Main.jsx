import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import slugify from 'slugify';
import InlineEditor from '../components/slate/InlineEditor';

import { logout } from '../redux/actions/authActions';
import { savePost, listPublicPosts, listPosts, getOnePublicPost, getOnePost } from '../redux/actions/postActions';

const Main = (props) => {
  const history = useHistory();
  const [categoryId, setCategoryId] = useState('');

  const { admin, friend, authenticated } = props;

  useEffect(() => {
    (async function () {
      if (props.admin || props.friend) {
        props.listPosts();
      } else {
        props.listPublicPosts();
      }
    })();
  }, [admin, friend, authenticated]);

  function handleSelectChange({ target }) {
    const { name, value } = target;
    console.log('name:::', name);
    console.log('value:::', value);
    setCategoryId(value);
  }

  function openSearch() {
    console.log('opening search');
    console.log('props.authenticated:::', props.authenticated);
  }

  function goTo(route) {
    history.push(route)
  }

  function save(update) {
    console.log('update:::', update);
    props.savePost(update);
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
      goTo('/editor/' + id);
    }
  }

  return (
    <PageWrapper>
      <Header>
        <h1>we can't get there from here...</h1>
        <p>a personal blog</p>
      </Header>

      <Nav>
        <button>Home</button>
        <select name="category" onChange={handleSelectChange} value={categoryId}>
          <option value="">Filter by Category</option>
          {props.categories.map((c, i) => (
            <option key={`cat-${i}`} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button onClick={openSearch}>Search</button>
        {props.authenticated
          ? <button onClick={props.logout}>Logout</button>
          : <button onClick={() => goTo('login')}>Login</button>
        }
      </Nav>

      <Bio>
        <p>Hello there. I'm so glad you've <span className="main-red">come</span>.</p>
        <p>
          Welcome to my blawg - a collection of writings on whatever the <span className="main-red">hell</span> I feel like. It's a repository for facts n factoids I want to remember &amp; <span className="main-red">ideas</span> I want to develop. It's a forum for rants, ramblings, rarities, and <span className="main-red">revelations</span>, mine and otherwise. It's a sucker's bet, a fool's errand. It's a warm, flat beer on a hot August day. How <em><strong>you</strong></em> doin?
        </p>
        <p>
          I am a proponent of <span className="main-red">science</span>, a student of the <span className="main-red">perennial philosophy</span>, and a keeper of my own <span className="main-red">god damned</span> counsel. Many would say I lean <span className="main-red">left</span>, but I would say I simply want the <span className="main-red">truth</span> (the whole truth, and nothing but the truth, so help me Gawduh). So buckle up and suck it up, cupcake - the truth may well set you free, but not until it's had its way with you. And so it begins.
        </p>
        {/* <p><em>Abandon all <span className="main-red">hope</span>, ye who enter here...</em></p> */}
        {/* <p><span className="main-red">Abandon all hope, ye who enter here...</span></p> */}
        <p><em><span className="main-red">Abandon all hope, ye who enter here...</span></em></p>
        {/* <p><em>Abandon all hope, ye who enter here...</em></p> */}
      </Bio>

      <PostsWrapper>
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
      </PostsWrapper>
    </PageWrapper>
  )
}

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    authenticated: state.auth.authenticated,
    friend: state.user.acl === "friend",
    posts: state.posts,
    categories: state.categories
  }
}

const mapDispatchToState = {
  getOnePost,
  getOnePublicPost,
  listPosts,
  listPublicPosts,
  logout,
  savePost
};

export default connect(mapPropsToState, mapDispatchToState)(Main);

const PageWrapper = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
`;

const Header = styled.header`
  width: 760px;
  margin: auto;

  > h1 {
    font-size: 48px;
    font-weight: 800;
    line-height: 1.8;
  }

  > p {
    font-size: 22px;
    text-indent: 10px;
    color: ${props => props.theme.mainRed};
  }
`;

const Nav = styled.nav`
  max-width: 400px;
  margin: 30px auto;
  padding: 16px 32px;
  display: flex;
  justify-content: center;
  background-color: #ffffff22;
  border-radius: 12px;
`;

const Bio = styled.section`
  width: 700px;
  margin: auto;
  padding: 20px 0;
  border-bottom: 2px solid ${props => props.theme.mainRed};
  color: #aaa;

  > p {
    font-size: 16px;
    padding: 8px 0;
    line-height: 1.3;

    .main-red {
      color: ${props => props.theme.mainRed};
    }
  }
`;

const PostsWrapper = styled.main`
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
