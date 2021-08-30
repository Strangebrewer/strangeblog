import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DisplayEditor from '../components/slate/DisplayEditor';

import { post } from '../api';

function Main(props) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function getPosts() {
      const { data } = await post.listPublicPosts();
      console.log('publicPosts:::', data);
      setPosts(data);
    }

    getPosts();
  }, []);

  const openSearch = () => {
    console.log('opening search');
  }

  return (
    <PageWrapper>
      <Header>
        <h1>we can't get there from here...</h1>
        <p>a personal blog</p>
      </Header>

      <Nav>
        <button>Home</button>
        <select name="category">
          <option value="all">Filter by Category</option>
          <option value="climate">Climate Change</option>
          <option value="spirituality">Spirituality</option>
        </select>
        <button onClick={openSearch}>Search</button>
      </Nav>

      <Bio>
        <p>Hello there.</p>
        <p>This is a collection of whatever I feel like writing about. It's a repository for subjects I want to remember, ideas I want to develop, rants, ramblings, rarities, and revelations. I am a proponent of science, a student of many spiritual paths, and I keep my own counsel. Many would say I lean left, but I would say I simply want the truth.</p>
        <p>Abandon all hope, ye who enter here...</p>
      </Bio>

      <PostsWrapper>
        {posts && posts.map((p, index) => {
          return (
            <Post>
              <h2>{p.title}</h2>
              <h4>{p.subtitle}</h4>
              <p>{p.createdAt}</p>
              <DisplayEditor text={p.body}/>
            </Post>
          )
        })}
      </PostsWrapper>
    </PageWrapper>
  )
}

function mapPropsToState(state) {
  return {}
}

const mapDispatchToState = {};

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
  border-bottom: 2px solid red;

  p {
    font-size: 16px;
    padding: 8px 0;
    line-height: 1.2;
  }
`;

const PostsWrapper = styled.main`
  width: 700px;
  margin: auto;
  padding: 20px 0;
`;

const Post = styled.article`
  > h2 {
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
