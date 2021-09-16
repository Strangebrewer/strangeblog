import { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { listPublicPosts, listPosts } from '../../redux/actions/postActions';
import { setSearch, setCount } from '../../redux/actions/otherActions';
import { getBasicSearchCriteria } from '../../utils/halp';

import Post from './Post';

const Posts = props => {
  const { admin, friend } = props;
  const { skip, take } = props.search;

  useEffect(() => {
    (async function () {
      let result;
      if (admin || friend) {
        result = await props.listPosts(props.search);
      } else {
        result = await props.listPublicPosts(props.search);
      }
      props.setCount(result.count);
    })();
  }, [admin, friend]);

  async function search(criteria) {
    const search = { ...getBasicSearchCriteria(), ...criteria };
    props.setSearch(search);
    let result;
    if (admin || friend) {
      result = await props.listPosts(search);
    } else {
      result = await props.listPublicPosts(search);
    }
    props.setCount(result.count);
  }

  async function nextTenPosts() {
    const plus10 = skip + 10;
    if (admin || friend) {
      await props.listPosts({ ...props.search, skip: plus10 }, true);
    } else {
      await props.listPublicPosts({ ...props.search, skip: plus10 }, true);
    }
    props.setSearch({ ...props.search, skip: plus10 });
  }

  return (
    <Wrapper>
      {props.posts && props.posts.map((post) => {
        return (
          <Post
            key={`post-${post.id}`}
            post={post}
            search={search}
          />
        )
      })}
      {(props.count >= (skip + take)) && <button onClick={nextTenPosts}>Load More...</button>}
    </Wrapper >
  )
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    count: state.count,
    friend: state.user.acl === "friend",
    posts: state.posts,
    search: state.search
  }
}

const mapDispatchToState = {
  listPosts,
  listPublicPosts,
  setCount,
  setSearch
};

export default connect(mapPropsToState, mapDispatchToState)(Posts);

const Wrapper = styled.main`
  width: 700px;
  margin: auto;
  padding: 20px 0;
`;
